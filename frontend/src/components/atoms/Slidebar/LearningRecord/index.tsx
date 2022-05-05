import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { Checkbox, Icon } from "semantic-ui-react";
import { deleteTodo, putLearningPlan } from "../../../../api/todoRequest";
import { Todo } from "../../../../types/Todo";
import { CalendarDrawing } from "../../../organisms/Calendar/Calendar";
import styles from "./index.module.css";

interface Props {
  todoData: Todo;
  setCalendarDrawing: React.Dispatch<
    React.SetStateAction<CalendarDrawing[] | undefined>
  >;
  setDailyTodos: React.Dispatch<React.SetStateAction<Todo[] | undefined>>;
  calendarDrawing: CalendarDrawing[] | undefined;
  dailyTodos: Todo[] | undefined;
}

export const LearningRocord: VFC<Props> = memo((props) => {
  const {
    todoData,
    setCalendarDrawing,
    calendarDrawing,
    dailyTodos,
    setDailyTodos,
  } = props;
  const [todo, setTodo] = useState<Todo>(todoData);

  useEffect(() => {
    setTodo(todoData);
  }, [todoData]);

  // 学習時間
  const onChangeInputTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo((state) => ({ ...state, learning_time: e.target.value }));
  };
  // チェックボックスの変更
  const onClickCheckBox = () => {
    const isDone = todo.is_done ? false : true;
    putLearningPlan(todo, isDone)
      .then((result) => {
        if (result) {
          drawingItemToCalendar(result);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // isdoneのbooleanを確認して、trueの場合カレンダーに表示処理,falseの場合カレンダーから削除する
  const drawingItemToCalendar = (todo: Todo) => {
    if (todo.is_done) {
      setTodo((state) => ({ ...state, is_done: todo.is_done }));
      const learningTime = todo.learning_time.substring(0, 5);
      const saveData: CalendarDrawing = {
        title: `${todo.todo_task} | ${learningTime}`,
        date: String(todo.execution_date),
        todoId: todo.todo_id,
      };
      if (calendarDrawing) {
        setCalendarDrawing([...calendarDrawing, saveData]);
      } else {
        // もし登録が初回だった場合
        setCalendarDrawing([saveData]);
      }
    } else {
      const saveData = calendarDrawing?.filter(
        (data) => data.todoId !== todo.todo_id
      );
      setTodo((state) => ({ ...state, is_done: todo.is_done }));
      setCalendarDrawing(saveData);
    }
  };

  // カレンダーからの表示を削除
  const removeFromCalendar = (isDone: boolean) => {
    const saveData = calendarDrawing?.filter(
      (data) => data.todoId !== todo.todo_id
    );
    setTodo((state) => ({ ...state, is_done: isDone }));
    setCalendarDrawing(saveData);
    const removeSlideBar = dailyTodos?.filter(
      (data) => data.todo_id !== todo.todo_id
    );
    setDailyTodos(removeSlideBar);
  };

  const onClickDeleteIcon = () => {
    if (!window.confirm("タスクを削除してもよろしいですか？")) return;
    deleteTodo(todo.todo_id)
      .then(() => {
        removeFromCalendar(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className={styles.taskContainer}>
        <p className={styles.taskText}>{todo.todo_task}</p>
        <div className={styles.taskCheckItems}>
          <div className={styles.learnningTime}>
            <input
              type="time"
              value={todo.learning_time}
              onChange={onChangeInputTime}
            />
            学習時間
          </div>
          <div className={styles.taskCheckBox}>
            <Checkbox
              label="完了"
              checked={todo.is_done}
              onClick={onClickCheckBox}
            />
          </div>
          <div className={styles.icon} onClick={onClickDeleteIcon}>
            <Icon name="trash" size="large" />
          </div>
        </div>
      </div>
    </>
  );
});

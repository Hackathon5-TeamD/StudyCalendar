import { memo, VFC } from "react";
import { Sidebar } from "semantic-ui-react";
import { deleteMemo, postMemo, putMemo } from "../../../api/memoRequests";
import { Memo } from "../../../types/Memo";
import { Todo } from "../../../types/Todo";
import { User } from "../../../types/User";
import { MarkdownEditor } from "../../atoms/MarkdownEditor";
import { LearningRocord } from "../../atoms/Slidebar/LearningRecord";
import { CalendarDrawing } from "../../organisms/Calendar/Calendar";
import styles from "./index.module.css";

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  date: Date | undefined;
  dailyTodos: Todo[] | undefined;
  setDailyTodos: React.Dispatch<React.SetStateAction<Todo[] | undefined>>;
  setCalendarDrawing: React.Dispatch<
    React.SetStateAction<CalendarDrawing[] | undefined>
  >;
  calendarDrawing: CalendarDrawing[] | undefined;
  memoData: Memo | undefined;
  setMemoData: React.Dispatch<React.SetStateAction<Memo>>;
  userData: User | undefined;
  dateStr: string;
  memoDataConfirm: Memo | undefined;
}

export const SlideinBar: VFC<Props> = memo((props) => {
  const {
    visible,
    setVisible,
    date,
    dailyTodos,
    setCalendarDrawing,
    calendarDrawing,
    setDailyTodos,
    memoData,
    setMemoData,
    userData,
    dateStr,
    memoDataConfirm,
  } = props;

  const onHideSlidebar = () => {
    setVisible(false);
    if (!userData || !memoData || !dateStr) return;
    if (!memoDataConfirm) {
      postMemo(userData.user_id, memoData.memo_txt, dateStr).catch((err) =>
        console.error(err)
      );
    } else if (memoDataConfirm && memoData.memo_txt === "") {
      deleteMemo(memoDataConfirm.memo_id).catch((err) => console.error(err));
    } else if (memoData.memo_txt !== memoDataConfirm.memo_txt) {
      putMemo(userData.user_id, memoData).catch((err) => console.error(err));
    }
  };

  return (
    <>
      <Sidebar
        animation="overlay"
        direction="bottom"
        icon="labeled"
        onHide={() => onHideSlidebar()}
        vertical={true}
        visible={visible}
      >
        <div className={styles.slideinContainer}>
          <div className={styles.SlideInleft}>
            <div>
              <div className={styles.lerningDayContainer}>
                <div className={styles.SlideInDay}>
                  {date ? date.getMonth() + 1 : null}月{date?.getDate()}日
                </div>
                <div className={styles.SlideInTask}>学習タスク</div>
              </div>
            </div>
            {dailyTodos?.map((todo) => {
              return (
                <LearningRocord
                  key={todo.todo_id}
                  todoData={todo}
                  setCalendarDrawing={setCalendarDrawing}
                  setDailyTodos={setDailyTodos}
                  calendarDrawing={calendarDrawing}
                  dailyTodos={dailyTodos}
                />
              );
            })}
          </div>
          <div className={styles.SlideInRight}>
            <div className={styles.SlideInRecord}>今日の記録</div>
            <div className={styles.markDownEditor}>
              <MarkdownEditor memoData={memoData} setMemoData={setMemoData} />
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
});

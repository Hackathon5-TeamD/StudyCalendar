import { ChangeEvent, useContext, useState } from "react";
import { postLearningPlan } from "../api/todoRequest";
import { UserContext } from "../providers/UserProvider";

export const useNewPlan = () => {
  const { userData } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [learningItem, setLearningItem] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [checkWeekDay, setCheckWeekDay] = useState<string[]>([]);
  const [learningTime, setLearnningTime] = useState("01:00");
  const [errorMessage, setErrorMessage] = useState("");

  // 学習項目のinputをstateに保存
  const onChageNewPlan = (e: ChangeEvent<HTMLInputElement>) => {
    setLearningItem(e.target.value);
  };

  // 開始日をstateに保存
  const onChangeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };
  // 終了日をstateに保存
  const onChangeEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  // チェックボックス
  const onChangeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    if (checkWeekDay.includes(e.target.value)) {
      setCheckWeekDay(checkWeekDay.filter((day) => day !== e.target.value));
    } else {
      setCheckWeekDay([...checkWeekDay, e.target.value]);
    }
  };
  // 学習時間をstateに保存
  const onChangeLearningTime = (e: ChangeEvent<HTMLInputElement>) => {
    setLearnningTime(e.target.value);
  };

  // todoの新規登録
  const onClickNewPlan = () => {
    if (!inputErrorHnadling()) return;
    if (!userData?.user_id) {
      setErrorMessage("エラーが発生しました。再度ログインをお願いします。");
      return;
    }
    if (!dateComparisonErrorHandling()) return;

    postLearningPlan(
      userData.user_id,
      learningItem,
      startDate,
      endDate,
      checkWeekDay,
      learningTime
    )
      .then(() => {
        setOpen(false);
        allStatesClear();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // stateの中身を全て空にする
  const allStatesClear = () => {
    setLearningItem("");
    setStartDate("");
    setEndDate("");
    setCheckWeekDay([]);
    setLearnningTime("01:00");
    setErrorMessage("");
  };

  const onCloseModal = () => {
    setOpen(false);
    allStatesClear();
  };

  // 未入力の場合エラーを出す
  const inputErrorHnadling = () => {
    if (
      !learningItem ||
      !startDate ||
      !endDate ||
      !checkWeekDay ||
      !learningTime
    ) {
      setErrorMessage("未入力の項目があります。");
      return false;
    } else {
      return true;
    }
  };

  // 日付を比較し終わりが始まりより早い場合、エラーを出す
  const dateComparisonErrorHandling = () => {
    if (new Date(startDate) > new Date(endDate)) {
      setErrorMessage("終了日が開始日より早いです。");
      return false;
    } else {
      return true;
    }
  };

  return {
    state: {
      open,
      learningItem,
      startDate,
      endDate,
      checkWeekDay,
      learningTime,
      errorMessage,
    },
    actions: {
      onChageNewPlan,
      onChangeCheckBox,
      onChangeEndDate,
      onChangeStartDate,
      onCloseModal,
      onChangeLearningTime,
      onClickNewPlan,
      setOpen,
    },
  };
};

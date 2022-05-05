import { memo, useContext, useState, VFC } from "react";
import styles from "./LearningRecordModal.module.css";
import { Icon, Modal, ModalHeader } from "semantic-ui-react";
import { CotentsTotalTime } from "../../atoms/LearningRecordModal/ContentsTotalTime/ContentsTotalTime";
import { TotalTime } from "../../atoms/LearningRecordModal/TotalTime/TotalTime";
import { PrimaryBotton } from "../../atoms/CalenderSidebar/PrimaryBotton/PrimaryBtton";
import { UserContext } from "../../../providers/UserProvider";
import {
  getAllTatalTime,
  getItemsTatalTime,
  getMonthlyTotalTime,
} from "../../../api/learningTimeRequest";
import { TotalTimeType } from "../../../types/Time";

export const LearningRecordModal: VFC = memo(() => {
  const [open, setOpen] = useState(false);
  const [allTime, setAllTime] = useState(0);
  const [itemsTime, setItemsTime] = useState<TotalTimeType[]>();
  const [monthlyTime, setMonthlyTime] = useState(0);
  const { userData } = useContext(UserContext);

  const fetchTotalTime = async () => {
    if (!userData) return;
    try {
      const resultAllTime = await getAllTatalTime(userData.user_id);
      const resultItemsTime = await getItemsTatalTime(userData.user_id);
      const resultMonthlyTime = await getMonthlyTotalTime(userData.user_id);
      // 3600秒（1時間）で割る、その他切り捨て
      setAllTime(Math.floor(resultAllTime.total_sec / 3600));
      setMonthlyTime(Math.floor(resultMonthlyTime.total_sec / 3600));
      setItemsTime(resultItemsTime);
    } catch (err: any) {
      console.error(err);
    }
  };

  const onClickLearningRecord = () => {
    setOpen(true);
    fetchTotalTime();
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer="inverted"
      trigger={
        <PrimaryBotton onClick={onClickLearningRecord}>
          学習記録を見る
        </PrimaryBotton>
      }
    >
      <ModalHeader icon="archive">
        <div className={styles.modalHeader}>
          <span className={styles.title}>学習記録一覧</span>
          <Icon
            name="close"
            size="big"
            className={styles.icon}
            onClick={() => setOpen(false)}
          />
        </div>
      </ModalHeader>

      <Modal.Content className={styles.modal}>
        <Modal.Description>
          <div className={styles.modalContainer}>
            <div className={styles.totalTimeContainer}>
              <TotalTime children={"今月"} totalTime={monthlyTime} />
              <TotalTime children={"トータル"} totalTime={allTime} />
            </div>
            <p className={styles.learningContentTitle}>
              学習項目ごとの総合学習時間
            </p>
            <div className={styles.learningContentsContainer}>
              {itemsTime?.map((item) => (
                <CotentsTotalTime
                  children={item.todo_task}
                  totalTime={Math.floor(item.total_sec / 3600)}
                />
              ))}
            </div>
          </div>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
});

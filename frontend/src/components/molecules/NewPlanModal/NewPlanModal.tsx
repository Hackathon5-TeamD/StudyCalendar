import { memo, VFC } from "react";
import styles from "./NewPlanModal.module.css";
import { Icon, Modal, ModalHeader } from "semantic-ui-react";
import { PrimaryBotton } from "../../atoms/CalenderSidebar/PrimaryBotton/PrimaryBtton";
import { NewPlanName } from "../../atoms/NewPlanModal/NewPlanName/NewPlanName";
import { LerningPlanDays } from "../../atoms/NewPlanModal/LerningPlanDays/LerningPlanDays";
import { LerningPlanTime } from "../../atoms/NewPlanModal/LerningPlanTime/LerningPlanTime";
import { LerningCheckBox } from "../../atoms/NewPlanModal/LerningCheckBox/LerningCheckBox";
import { WideButton } from "../../atoms/shared/WideButton";
import { useNewPlan } from "../../../hooks/useNewPlan";

export const NewPlanModal: VFC = memo(() => {
  const WEEKDAY = ["月", "火", "水", "木", "金", "土", "日"];
  const { state, actions } = useNewPlan();

  return (
    <Modal
      onClose={() => actions.onCloseModal()}
      onOpen={() => actions.setOpen(true)}
      open={state.open}
      dimmer="inverted"
      trigger={
        <PrimaryBotton onClick={() => actions.setOpen(true)}>
          新規学習を作成
        </PrimaryBotton>
      }
    >
      <ModalHeader icon="archive">
        <div className={styles.modalHeader}>
          <span className={styles.title}>新規学習計画を作成</span>
          <Icon
            name="close"
            size="big"
            className={styles.icon}
            onClick={() => actions.onCloseModal()}
          />
        </div>
      </ModalHeader>

      <Modal.Content className={styles.modal}>
        <Modal.Description>
          <div className={styles.PlanBody}>
            <div className={styles.PlanName}>
              <label>新規学習名</label>
              <NewPlanName
                type="text"
                placeholder="学習プランの名称を入力してください"
                onChange={actions.onChageNewPlan}
                value={state.learningItem}
              />
            </div>
            <div className={styles.PlanStartEnd}>
              <LerningPlanDays
                LerningPlanLabel={"開始"}
                onChange={actions.onChangeStartDate}
                value={state.startDate}
              />
              <LerningPlanDays
                LerningPlanLabel={"終了"}
                onChange={actions.onChangeEndDate}
                value={state.endDate}
              />
            </div>
            <div className={styles.PlanWeekHour}>
              <div>
                <span>学習する曜日</span>
                <br />
                {WEEKDAY.map((day, index) => (
                  <LerningCheckBox
                    key={index}
                    LerningPlanLabel={day}
                    onChange={actions.onChangeCheckBox}
                    value={day}
                  />
                ))}
              </div>
              <LerningPlanTime
                LerningPlanLabel={"学習時間"}
                onChange={actions.onChangeLearningTime}
                value={state.learningTime}
              />
            </div>
            {state.errorMessage ? (
              <p className={styles.errorMessage}>{state.errorMessage}</p>
            ) : null}

            <WideButton
              children={"学習計画を追加"}
              onClick={actions.onClickNewPlan}
            />
          </div>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
});

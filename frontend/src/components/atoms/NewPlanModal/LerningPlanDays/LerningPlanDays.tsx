import { ChangeEventHandler, memo, VFC } from "react";
import styles from "./LerningPlanDays.module.css";

interface Props {
  LerningPlanLabel: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}

export const LerningPlanDays: VFC<Props> = memo((props) => {
  const { LerningPlanLabel, onChange, value } = props;
  return (
    <>
      <div>
        <label>{LerningPlanLabel}</label>
        <br />
        <input
          className={styles.PlanDate}
          type="date"
          onChange={onChange}
          value={value}
        />
      </div>
    </>
  );
});

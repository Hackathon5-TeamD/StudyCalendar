import { ChangeEventHandler, memo, VFC } from "react";
import styles from "./LerningPlanTime.module.css";

interface Props {
  LerningPlanLabel: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}

export const LerningPlanTime: VFC<Props> = memo((props) => {
  const { LerningPlanLabel, onChange, value } = props;
  return (
    <>
      <div>
        <label>{LerningPlanLabel}</label>
        <br />
        <input
          className={styles.StartTime}
          type="time"
          onChange={onChange}
          value={value}
        />
      </div>
    </>
  );
});

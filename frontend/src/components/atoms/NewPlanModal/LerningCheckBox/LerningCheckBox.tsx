import { ChangeEventHandler, memo, VFC } from "react";
import styles from "./LerningCheckBox.module.css";

interface Props {
  LerningPlanLabel: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

export const LerningCheckBox: VFC<Props> = memo((props) => {
  const { LerningPlanLabel, onChange, value } = props;
  return (
    <>
      <div className={styles.CheckBoxContainer}>
        <label>{LerningPlanLabel}</label>
        <input
          className={styles.LerningCheckBoxInput}
          type="checkbox"
          onChange={onChange}
          value={value}
        />
      </div>
    </>
  );
});

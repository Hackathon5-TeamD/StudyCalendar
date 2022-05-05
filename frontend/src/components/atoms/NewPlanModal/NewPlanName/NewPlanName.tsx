import { ChangeEventHandler, memo, VFC } from "react";
import styles from "./NewPlanName.module.css";

interface Props {
    type: string;
    placeholder: string;
    value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}
export const NewPlanName: VFC<Props> = memo((props) => {
  const { type, placeholder, value, onChange } = props;
  return (
    <>
    <div>
        <input
            className={styles.NewPlanNameInput}
            type={type}
            name={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        ></input>
    </div>
    </>
  );
});

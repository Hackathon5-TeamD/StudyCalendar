import { ChangeEventHandler, memo, VFC } from "react";
import styles from "./index.module.css";

interface Props {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}
export const SignInInput: VFC<Props> = memo((props) => {
  const { type, placeholder, value, onChange } = props;
  return (
    <input
      className={styles.signupform}
      type={type}
      name={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></input>
  );
});

import { memo, VFC } from "react";
import styles from "./index.module.css";

interface Props {
  children: string;
  onClick?: () => void;
}

export const SignInWideButton: VFC<Props> = memo((props) => {
  const { children, onClick } = props;
  return (
    <button className={styles.wideButton} onClick={onClick}>
      {children}
    </button>
  );
});

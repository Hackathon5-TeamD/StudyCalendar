import { memo, VFC } from "react";
import styles from "./index.module.css";

interface Props {
  children: string;
  onClick: () => void;
}

export const SignInSmallButton: VFC<Props> = memo((props) => {
  const { children, onClick } = props;
  return (
    <button className={styles.smallButton} onClick={onClick}>
      {children}
    </button>
  );
});

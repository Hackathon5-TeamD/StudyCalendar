import { memo, VFC } from "react";
import styles from "./ItemName.module.css";

interface Props {
  children: string;
}

export const ItemName: VFC<Props> = memo((props) => {
  const { children } = props;
  return (
    <>
      <div className={styles.text}>{children}</div>
      <div className={styles.underline}></div>
    </>
  );
});

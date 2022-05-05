import { memo, VFC } from "react";
import styles from "./TotalTime.module.css";

interface Props {
  children: string;
  totalTime: number;
}

export const TotalTime: VFC<Props> = memo((props) => {
  const { children, totalTime } = props;
  return (
    <>
      <div>
        {children}
        <span className={styles.totalTime}>{totalTime}</span>時間
      </div>
    </>
  );
});

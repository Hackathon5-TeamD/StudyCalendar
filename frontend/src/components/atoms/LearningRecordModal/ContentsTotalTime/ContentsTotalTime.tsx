import { memo, VFC } from "react";
import styles from "./ContentsTotalTime.module.css";

interface Props {
  children: string;
  totalTime: number;
}

export const CotentsTotalTime: VFC<Props> = memo((props) => {
  const { children, totalTime } = props;
  return (
    <>
      <div className={styles.learningTimesDiv}>
        <div>
          <p className={styles.contentName}>{children}</p>
        </div>
        <div>
          <span className={styles.contentsTotalTime}>{totalTime}</span>時間
        </div>
      </div>
    </>
  );
});

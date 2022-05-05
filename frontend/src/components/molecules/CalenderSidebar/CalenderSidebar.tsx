import { memo, useContext, VFC } from "react";
import { useNavigate } from "react-router-dom";
import {
  SidebarPushable,
  Sidebar,
  Segment,
  Header,
  Menu,
} from "semantic-ui-react";
import { UserContext } from "../../../providers/UserProvider";
import { ItemName } from "../../atoms/CalenderSidebar/ItemName/ItemName";
import { PrimaryBotton } from "../../atoms/CalenderSidebar/PrimaryBotton/PrimaryBtton";
import { LearningRecordModal } from "../LearningRecordModal/LearningRecordModal";
import { NewPlanModal } from "../NewPlanModal/NewPlanModal";
import styles from "./CalenderSidebar.module.css";

export const CalenderSidebar: VFC = memo(() => {
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const onClickLogout = () => {
    localStorage.removeItem("token");
    setUserData(undefined);
    navigate("/signin");
  };
  return (
    <div className={styles.sidebarContainer}>
      <SidebarPushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          vertical={true}
          visible
          width="thin"
        >
          <div>
            <ItemName>学習</ItemName>
          </div>
          <div className={styles.btnContainer}>
            <NewPlanModal />
            <p className={styles.magin}></p>
            <LearningRecordModal />
          </div>

          <div className={styles.logoutBtn}>
            <PrimaryBotton onClick={onClickLogout}>ログアウト</PrimaryBotton>
          </div>
        </Sidebar>

        <SidebarPushable>
          <Segment basic>
            <Header as="h3"></Header>
            <div className={styles.div}></div>
          </Segment>
        </SidebarPushable>
      </SidebarPushable>
    </div>
  );
});

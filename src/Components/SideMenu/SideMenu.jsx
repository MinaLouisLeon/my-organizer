import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionSetUrl,
  actionSetAllTasks,
  actionSetTasksLinks,
} from "../../actions";
import { getFromDatabase } from "../../backend/database";
const SideMenu = () => {
  const dispatch = useDispatch();
  const userUID = useSelector((state) => state.loginReducer.userUID);
  const handleAllTasks = () => {
    getFromDatabase("Tasks/" + userUID + "/tasks").then((data) => {
      dispatch(actionSetAllTasks(data));
    });
    getFromDatabase("Tasks/" + userUID + "/links").then((data) => {
      dispatch(actionSetTasksLinks(data));
      dispatch(actionSetUrl("allTasks"));
    });
    // fetch(window.serverIp + '/get-tasks',{
    //     method : "POST"
    // })
    // .then((res) => {
    //     return res.json()
    // })
    // .then((data) => {
    //    dispatch(actionSetAllTasks(data))
    //    dispatch(actionSetUrl('allTasks'))
    // })
  };

  return (
    <IonMenu contentId="enableSideMenu">
      <IonHeader>
        <IonToolbar mode="ios">
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem button onClick={() => dispatch(actionSetUrl("home"))}>
            <IonLabel>Home</IonLabel>
          </IonItem>
          <IonItem button onClick={() => handleAllTasks()}>
            <IonLabel>All Tasks</IonLabel>
          </IonItem>
          <IonItem button onClick={() => dispatch(actionSetUrl('projects'))} >
            <IonLabel>Projects</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
export default SideMenu;

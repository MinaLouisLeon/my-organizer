import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonPopover,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionSetAllTasks, actionSetUrl } from "../../actions";
import AddTask from "../../Components/tasks/AddTask";
import ListTasks from "../../Components/tasks/ListTasks";
import SideMenu from "../../Components/SideMenu/SideMenu";
const AllTasks = () => {

    const dispatch = useDispatch();

  const [addTaskPopOverState, setAddTaskPopOverState] = useState({
    addTaskShowPopOver: false,
    event: undefined,
  });

  const handleAddTask = (e) => {
    e.persist();
    setAddTaskPopOverState({
      addTaskShowPopOver: true,
      event: e,
    });
  };

  return (
    <IonPage>
    <SideMenu />
      <IonPopover
        event={addTaskPopOverState.event}
        isOpen={addTaskPopOverState.addTaskShowPopOver}
        onDidDismiss={() =>
          setAddTaskPopOverState({
            addTaskShowPopOver: false,
            event: undefined,
          })
        }
      >
        <ListTasks />
        <AddTask />
      </IonPopover>
      <IonHeader>
        <IonToolbar>
            <IonMenuButton slot='start' />
          <IonTitle className="fw6 black">{/* TODO add date time  */}</IonTitle>
          <IonButtons slot="end">
            <IonButton color='success' onClick={() => dispatch(actionSetUrl('ganttChart'))}>
              Gantt Chart
            </IonButton>
            <IonButton
              color="primary"
              fill="clear"
              onClick={(e) => handleAddTask(e)}
            >
              Add Task
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent id="enableSideMenu">
        <ListTasks />
      </IonContent>
    </IonPage>
  );
};

export default AllTasks;

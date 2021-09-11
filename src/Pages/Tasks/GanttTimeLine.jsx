import {
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonPopover,
  IonButtons,
  IonButton,

} from "@ionic/react";
import SideMenu from "../../Components/SideMenu/SideMenu";
import ListTasks from "../../Components/tasks/ListTasks";
import AddTask from "../../Components/tasks/AddTask";
import TimeLine from "react-gantt-timeline";
import { useSelector, useDispatch } from "react-redux";
import { actionSetAllTasks } from "../../actions";
import { useState } from "react";

const GanttTimeLine = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasksReducer.allTasks);


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

  function compare(a, b) {
    const idA = parseInt(a.id);
    const idB = parseInt(b.id);
    let comparison = 0;
    if (idA > idB) {
      comparison = 1;
    } else if (idA < idB) {
      comparison = -1;
    }
    return comparison;
  }

  tasks.sort(compare);
  console.log("ordred tasks : ", tasks);
  const handleTaskUpdate = async (task, props) => {
    let taskId = 0;
    let taskName = "";
    let taskStart = "";
    let taskEnd = "";
    if (props.name) {
      taskId = task.id;
      taskName = props.name;
      const updateTaskNameObj = {taskId,taskName};
      await fetch(window.serverIp + '/update-task-name',{
          method : "POST",
          headers : {"Content-Type":"application/json"},
          body : JSON.stringify(updateTaskNameObj)
      })
      .then((res) => {
          return res.json();
      })
      .then((data) => {
        dispatch(actionSetAllTasks(data));
      })
    } else {
      taskId = task.id;
      taskName = task.name;
      taskStart = props.start;
      taskEnd = props.end;
      const taskUpdateObj = {
        taskId,
        taskName,
        taskStart,
        taskEnd,
      };

      await fetch(window.serverIp + "/updateTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskUpdateObj),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          dispatch(actionSetAllTasks(data));
        });
    }
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
          <IonMenuButton slot="start" />
          <IonTitle className="fw6 black">Gantt Chart</IonTitle>
          <IonButtons slot='end'>
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
      <IonContent id="enableSideMenu" fullscreen>
        <TimeLine
          data={tasks}
          onSelectItem={(task) => console.log("onSelectItem : ", task)}
          onUpdateTask={(task, props) => handleTaskUpdate(task, props)}
        />
      </IonContent>
    </IonPage>
  );
};

export default GanttTimeLine;

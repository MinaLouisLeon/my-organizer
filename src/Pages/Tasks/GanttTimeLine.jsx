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
import {
  updateTaskName,
  updateTaskDate,
  updateTaskLink,
} from "../../backend/database";
import { useSelector, useDispatch } from "react-redux";
import { actionSetAllTasks, actionSetTasksLinks } from "../../actions";
import { useState } from "react";

const GanttTimeLine = () => {
  const dispatch = useDispatch();
  const alltasks = useSelector((state) => state.tasksReducer.allTasks);
  const allLinks = useSelector((state) => state.tasksReducer.links);
  const userUID = useSelector((state) => state.loginReducer.userUID);

  let tasks = [];

  alltasks.map((task) => {
    return tasks.push(task.data);
  });

  let links = [];

  allLinks.map((link) => {
    return links.push(link.data);
  });
  console.log(tasks);

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

  const handleUpdateLinks = (links) => {
    console.log("start", links.start.task.id);
    console.log("end", links.end.task.id);
    const id = links.start.task.id.toString();
    const start = links.start.task.id;
    const end = links.end.task.id;
    updateTaskLink("Tasks/" + userUID + "/links", id, start, end).then(
      (data) => {
        dispatch(actionSetTasksLinks(data));
      }
    );
  };

  // function compare(a, b) {
  //   const idA = parseInt(a.id);
  //   const idB = parseInt(b.id);
  //   let comparison = 0;
  //   if (idA > idB) {
  //     comparison = 1;
  //   } else if (idA < idB) {
  //     comparison = -1;
  //   }
  //   return comparison;
  // }

  // tasks.sort(compare);
  // console.log("ordred tasks : ", tasks);
  const handleTaskUpdate = async (task, props) => {
    let id = "";
    let taskName = "";
    let taskStart = "";
    let taskEnd = "";
    if (props.name) {
      id = task.id.toString();
      taskName = props.name;
      updateTaskName("Tasks/" + userUID + "/tasks", id, taskName).then((data) =>
        dispatch(actionSetAllTasks(data))
      );
      // const updateTaskNameObj = {id,taskName};
      // await fetch(window.serverIp + '/update-task-name',{
      //     method : "POST",
      //     headers : {"Content-Type":"application/json"},
      //     body : JSON.stringify(updateTaskNameObj)
      // })
      // .then((res) => {
      //     return res.json();
      // })
      // .then((data) => {
      //   dispatch(actionSetAllTasks(data));
      // })
    } else {
      console.log(props);
      id = task.id.toString();
      taskStart = props.start.toString();
      taskEnd = props.end.toString();
      // console.log('taskStart : ' , taskStart.valueOf());
      // console.log('taskEnd : ',taskEnd);
      // console.log(typeof taskStart)
      updateTaskDate(
        "Tasks/" + userUID + "/tasks",
        id,
        taskStart,
        taskEnd
      ).then((data) => dispatch(actionSetAllTasks(data)));
      // const taskUpdateObj = {
      //   id,
      //   taskName,
      //   taskStart,
      //   taskEnd,
      // };

      // await fetch(window.serverIp + "/updateTask", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(taskUpdateObj),
      // })
      //   .then((res) => {
      //     return res.json();
      //   })
      //   .then((data) => {
      //     dispatch(actionSetAllTasks(data));
      //   });
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
          <IonButtons slot="end">
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
          links={links}
          onSelectItem={(task) => console.log("task", task)}
          // onUpdateTask={(task, props) => handleTaskUpdate(task, props)}
          onUpdateTask={(task, props) => handleTaskUpdate(task, props)}
          onCreateLink={(link) => handleUpdateLinks(link)}
        />
      </IonContent>
    </IonPage>
  );
};

export default GanttTimeLine;

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
import './Tasks.css';
const GanttTimeLine = () => {
  const dispatch = useDispatch();
  const alltasks = useSelector((state) => state.tasksReducer.allTasks);
  const allLinks = useSelector((state) => state.tasksReducer.links);
  const userUID = useSelector((state) => state.loginReducer.userUID);
  const projectName = useSelector(state => state.projectsReducer.openProject[0].data.name);
  const projectId = useSelector(
    (state) => state.projectsReducer.openProject[0].id
  );
  const [mode,setMode] = useState('month');
  

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
    const id = links.start.task.id.toString();
    const start = links.start.task.id;
    const end = links.end.task.id;

    // updateTaskLink("Tasks/" + userUID + "/links", id, start, end).then(
    //   (data) => {
    //     dispatch(actionSetTasksLinks(data));
    //   }
    // );
    updateTaskLink(
      "Users/" + userUID + "/Projects/" + projectId.toString() + "/links",
      id,
      start,
      end
    ).then((data) => {
      dispatch(actionSetTasksLinks(data));
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

  const handleTaskUpdate = async (task, props) => {
    let id = "";
    let taskName = "";
    let taskStart = "";
    let taskEnd = "";
    if (props.name) {
      id = task.id.toString();
      taskName = props.name;
      // updateTaskName("Tasks/" + userUID + "/tasks", id, taskName).then((data) =>
      //   dispatch(actionSetAllTasks(data))
      // );
      updateTaskName(
        "Users/" + userUID + "/Projects/" + projectId.toString() + "/tasks",
        id,
        taskName
      ).then((data) => dispatch(actionSetAllTasks(data)));
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
      // updateTaskDate(
      //   "Tasks/" + userUID + "/tasks",
      //   id,
      //   taskStart,
      //   taskEnd
      // ).then((data) => dispatch(actionSetAllTasks(data)));
      updateTaskDate(
        "Users/" + userUID + "/Projects/" + projectId.toString() + "/tasks",
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

  const handleModeBtn = () => {
    if(mode === 'day'){
      return(
        <div className='ganntChart-mode-btn-view'>
            <IonButton color='success' onClick={() => setMode('day')}>Day</IonButton>
            <IonButton color='primary' onClick={() => setMode('week')}>Week</IonButton>
            <IonButton color='primary' onClick={() => setMode('month')}>Month</IonButton>
            <IonButton color='primary' onClick={() => setMode('year')}>Year</IonButton>
        </div>
      )
    }else if (mode === 'week'){
      return(
        <div className='ganntChart-mode-btn-view'>
            <IonButton color='primary' onClick={() => setMode('day')}>Day</IonButton>
            <IonButton color='success' onClick={() => setMode('week')}>Week</IonButton>
            <IonButton color='primary' onClick={() => setMode('month')}>Month</IonButton>
            <IonButton color='primary' onClick={() => setMode('year')}>Year</IonButton>
        </div>
      )
    }else if(mode === 'month'){
      return(
        <div className='ganntChart-mode-btn-view'>
            <IonButton color='primary' onClick={() => setMode('day')}>Day</IonButton>
            <IonButton color='primary' onClick={() => setMode('week')}>Week</IonButton>
            <IonButton color='success' onClick={() => setMode('month')}>Month</IonButton>
            <IonButton color='primary' onClick={() => setMode('year')}>Year</IonButton>
        </div>
      )
    }else if (mode === 'year'){
      return(
        <div className='ganntChart-mode-btn-view'>
            <IonButton color='primary' onClick={() => setMode('day')}>Day</IonButton>
            <IonButton color='primary' onClick={() => setMode('week')}>Week</IonButton>
            <IonButton color='primary' onClick={() => setMode('month')}>Month</IonButton>
            <IonButton color='success' onClick={() => setMode('year')}>Year</IonButton>
        </div>
      )
    }
  }

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
          <IonTitle className="fw6">Gantt Chart</IonTitle>
          <IonButtons slot='end' >
            {handleModeBtn()}
          </IonButtons>
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
          config={{
            header: {
              top: {
                style: {
                  background: "linear-gradient( grey, black)",
                  textShadow: "0.5px 0.5px black",
                  fontSize: 12,
                },
              },
              middle: {
                style: {
                  background: "linear-gradient( orange, grey)",
                  fontSize: 9,
                },
              },
              bottom: {
                style: {
                  background: "linear-gradient( grey, black)",
                  fontSize: 9,
                  color: "orange",
                },
                selectedStyle: {
                  background: "linear-gradient( #d011dd ,#d011dd)",
                  fontWeight: "bold",
                  color: "white",
                },
              },
            },
            taskList: {
              title: {
                label: projectName,
                style: {
                  background: "linear-gradient( grey, black)",
                },
              },
              task: {
                style: {
                  backgroundColor: "grey",
                  color: "white",
                },
              },
              verticalSeparator: {
                style: {
                  backgroundColor: "#fbf9f9",
                },
                grip: {
                  style: {
                    backgroundColor: "red",
                  },
                },
              },
            },
            dataViewPort: {
              rows: {
                style: {
                  backgroundColor: "white",
                  borderBottom: "solid 0.5px silver",
                },
              },
              task: {
                showLabel: false,
                style: {
                  borderRadius: 1,
                  boxShadow: "2px 2px 8px #888888",
                },
              },
            },
          }}
          data={tasks}
          links={links}
          mode={mode}
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

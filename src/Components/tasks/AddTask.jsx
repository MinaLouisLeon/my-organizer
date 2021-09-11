import { IonButton, IonInput, IonItem, IonList } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionSetAllTasks } from "../../actions";
import { useSelector } from "react-redux";
import { addToDatabase } from "../../backend/database";
const AddTask = () => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState(null);
  const allTasks = useSelector((state) => state.tasksReducer.allTasks);
  const userUID = useSelector(state => state.loginReducer.userUID);
  const handleAddTask = async (e) => {
    e.preventDefault();
    let taskId = 0;
    if(allTasks.length === 0){
      console.log('first task')
      taskId = 1;
    }else{
      console.log('not first task')
      taskId = parseInt(allTasks[allTasks.length - 1].id) + 1;
    }
    let today = new Date();
    let start =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let end =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      (today.getDate() + 2);
    let progress = 10;
    let dependencies = "";
    let type = "warning";
    let color = 'blue';
    let status = 'open';
    let note = '';
    //firebase
    const taskObj = {
      taskName,
      start,
      end,
      color,
      status,
      note
    }
    addToDatabase('Tasks/' + userUID + '/tasks',taskId.toString(),taskObj,userUID)
    //postgres
    const newTaskObject = {
      taskName,
      start,
      end,
      progress,
      dependencies,
      type,
    };
    fetch(window.serverIp + "/add-tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTaskObject),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(actionSetAllTasks(data));
        setTaskName(null);
      });
  };

  return (
    <form onSubmit={handleAddTask}>
      <IonList>
        <IonItem>
          <IonInput
            type="text"
            placeholder="Enter Task Name"
            value={taskName}
            clearInput={true}
            required
            onIonChange={(e) => setTaskName(e.detail.value)}
            autofocus={true}
          />
          <IonButton slot="end" type="submit">
            Add Task
          </IonButton>
        </IonItem>
      </IonList>
    </form>
  );
};

export default AddTask;

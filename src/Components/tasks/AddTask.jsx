import { IonButton, IonInput, IonItem, IonList } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionSetAllTasks } from "../../actions";
const AddTask = () => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState(null);

  const handleAddTask = async (e) => {
    e.preventDefault();
      let today = new Date();
      let start = today.getFullYear()+'-'+(today.getMonth(+1))+'-'+today.getDate();
      let end = today.getFullYear()+'-'+(today.getMonth(+1))+'-'+(today.getDate()+2);
      let progress = 10;
      let dependencies = '';
      let type = 'warning';
      const newTaskObject = {taskName,start,end,progress,dependencies,type}
    fetch(window.serverIp + '/add-tasks',{
        method : "POST",
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify(newTaskObject)
    })
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log(data)
        dispatch(actionSetAllTasks(data))
        setTaskName(null)
    })
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
          <IonButton slot="end" type='submit'>
            Add Task
          </IonButton>
        </IonItem>
      </IonList>
    </form>
  );
};

export default AddTask;

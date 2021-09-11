import { IonButton, IonItem, IonLabel, IonList } from "@ionic/react";
import { useSelector, useDispatch } from "react-redux";
import { actionSetAllTasks } from "../../actions";
import { getFromDatabase } from "../../backend/database";
const ListTasks = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.tasksReducer.allTasks);
  const userUID = useSelector(state => state.loginReducer.userUID);
  getFromDatabase('Tasks/' + userUID + '/tasks').then((data) => console.log(data))
  
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

  allTasks.sort(compare);

  const handleDelete = (id) => {
    const idObj = { id };
    fetch(window.serverIp + "/delete-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(idObj),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(actionSetAllTasks(data));
      });
  };

  return (
    <>
      <IonList>
        {allTasks.map((task) => {
          return (
            <IonItem>
              <IonLabel>{task.name}</IonLabel>
              <IonButton color="success">Edit</IonButton>
              <IonButton color="danger" onClick={() => handleDelete(task.id)}>
                Delete
              </IonButton>
            </IonItem>
          );
        })}
      </IonList>
    </>
  );
};

export default ListTasks;

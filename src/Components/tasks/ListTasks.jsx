import { IonButton, IonItem, IonLabel, IonList } from "@ionic/react";
import { useSelector, useDispatch } from "react-redux";
import { actionSetAllTasks, actionSetEditTask, actionSetTasksLinks, actionSetUrl } from "../../actions";
import { deleteFromDatabase } from "../../backend/database";
const ListTasks = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.tasksReducer.allTasks);
  const userUID = useSelector(state => state.loginReducer.userUID);
  const projectId = useSelector(state => state.projectsReducer.openProject[0].id);
  console.log(allTasks);

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

    // deleteFromDatabase('Tasks/' + userUID + '/tasks',id.toString())
    // .then((data) => dispatch(actionSetAllTasks(data)))
    // deleteFromDatabase('Tasks/' + userUID + '/links',id.toString())
    // .then((data) => dispatch(actionSetTasksLinks(data)))
    deleteFromDatabase('Users/' + userUID + '/Projects/' + projectId.toString() + '/tasks',id.toString())
    .then((data) => dispatch(actionSetAllTasks(data)));
    deleteFromDatabase("Users/" + userUID + '/Projects/' + projectId.toString() + '/links',id.toString())
    .then((data) => dispatch(actionSetTasksLinks(data)));
    //postgresql
    // const idObj = { id };
    // fetch(window.serverIp + "/delete-task", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(idObj),
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     dispatch(actionSetAllTasks(data));
    //   });
  };

  const handleEditTask = (id,data) => {
    dispatch(actionSetEditTask(id,data));
    dispatch(actionSetUrl('editTask'))
  }

  const handleList = () => {
    if (allTasks.length !== 0) {
      return (
        <IonList className='shadow-2'>
          {allTasks.map((task) => {
            return (
              <IonItem>
                <IonLabel>{task.data.name}</IonLabel>
                <IonButton color="success" onClick={() => handleEditTask(task.id,task.data)} >Edit</IonButton>
                <IonButton color="danger" onClick={() => handleDelete(task.id)}>
                  Delete
                </IonButton>
              </IonItem>
            );
          })}
        </IonList>
      );
    }else{
      console.log(allTasks.length)
    }
  };

  return <>{handleList()}</>;
};

export default ListTasks;

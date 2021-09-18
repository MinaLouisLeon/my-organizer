import { IonButton, IonInput, IonItem, IonList } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  actionSetAllTasks,
  actionSetTasksLinks,
} from "../../actions";
import { useSelector } from "react-redux";
import { addToDatabase } from "../../backend/database";
const AddTask = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState(null);
  const allTasks = useSelector((state) => state.tasksReducer.allTasks);
  const userUID = useSelector((state) => state.loginReducer.userUID);

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

  const handleAddTask = async (e) => {
    e.preventDefault();
    let id = 0;
    if (allTasks.length === 0) {
      console.log("first task");
      id = 1;
    } else {
      console.log("not first task");
      let newId = allTasks[allTasks.length - 1].id + 1;
      id = parseInt(newId);
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
    let color = "#2196F3";
    let status = "open";
    let note = "";
    //firebase
    //create task data
    const taskObj = {
      name,
      start,
      end,
      color,
      status,
      note,
      id,
    };
    addToDatabase("Tasks/" + userUID + "/tasks", id.toString(), taskObj).then(
      (data) => {
        dispatch(actionSetAllTasks(data));
        setName(null);
      }
    );
    //create links data
    start = "";
    end = "";
    const taskLinksObj = {
      id,
      start,
      end,
    };
    addToDatabase(
      "Tasks/" + userUID + "/links",
      id.toString(),
      taskLinksObj
    ).then((data) => {
      console.log("links data", data);
      dispatch(actionSetTasksLinks(data));
    });
    //postgres
    // const newTaskObject = {
    //   taskName,
    //   start,
    //   end,
    //   progress,
    //   dependencies,
    //   type,
    // };
    // fetch(window.serverIp + "/add-tasks", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newTaskObject),
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     dispatch(actionSetAllTasks(data));
    //
    //   });
  };

  return (
    <form onSubmit={handleAddTask}>
      <IonList>
        <IonItem>
          <IonInput
            type="text"
            placeholder="Enter Task Name"
            value={name}
            clearInput={true}
            required
            onIonChange={(e) => setName(e.detail.value)}
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

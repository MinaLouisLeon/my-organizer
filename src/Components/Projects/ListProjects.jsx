import { IonButton, IonItem, IonLabel, IonList } from "@ionic/react";
import { useSelector, useDispatch } from "react-redux";
import {
  actionSetAllTasks,
  actionSetEditProject,
  actionSetOpenProject,
  actionSetTasksLinks,
  actionSetUrl,
} from "../../actions";
import { getFromDatabase } from "../../backend/database";
const ListProjects = () => {
  const dispatch = useDispatch();
  const allProjects = useSelector((state) => state.projectsReducer.allProjects);
  const userUID = useSelector((state) => state.loginReducer.userUID);
  function compare(a, b) {
    const idA = parseInt(a);
    const idB = parseInt(b);
    let comparison = 0;
    if (idA > idB) {
      comparison = 1;
    } else if (idA < idB) {
      comparison = -1;
    }
    return comparison;
  }

  allProjects.sort(compare);

  const handleOpenProject = (id,data) => {
    getFromDatabase(
      "Users/" + userUID + "/Projects/" + id.toString() + "/tasks"
    ).then((data) => {
      dispatch(actionSetAllTasks(data));
    });
    getFromDatabase(
      "Users/" + userUID + "/Projects/" + id.toString() + "/links"
    ).then((data) => {
      dispatch(actionSetTasksLinks(data));
    });
    dispatch(actionSetOpenProject(id,data));
    dispatch(actionSetUrl("allTasks"));
  };

  const handleList = () => {
    if (allProjects.length !== 0) {
      return (
        <IonList className="shadow-2">
          {allProjects.map((project) => {
            return (
              <IonItem>
                <IonLabel>{project.data.name}</IonLabel>
                <IonButton onClick={() => handleOpenProject(project.id,project.data)}>
                  Open Project
                </IonButton>
                <IonButton
                  color="success"
                  onClick={() => {
                    dispatch(actionSetEditProject(project.id, project.data));
                    dispatch(actionSetUrl("editProject"));
                  }}
                >
                  Edit
                </IonButton>
              </IonItem>
            );
          })}
        </IonList>
      );
    }
  };

  return <>{handleList()}</>;
};

export default ListProjects;

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonCard,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
} from "@ionic/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionClearEditProject, actionSetAllProjects, actionSetUrl } from "../../actions";
import './Projects.css';
import { addToDatabase } from "../../backend/database";

const EditProject = () => {
  const dispatch = useDispatch();
  const userUID = useSelector((state) => state.loginReducer.userUID);
  const projectId = useSelector(
    (state) => state.projectsReducer.editProject[0].id
  );
  const projectData = useSelector(
    (state) => state.projectsReducer.editProject[0].data
  );
  const [name, setName] = useState(projectData.name);
  const [projectDescription, setProjectDescription] = useState(
    projectData.projectDescription
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProjectData = {name,projectDescription}
    addToDatabase("Users/" + userUID + "/Projects",projectId.toString(),newProjectData)
    .then((data) => {
        dispatch(actionSetAllProjects(data));
        dispatch(actionClearEditProject());
        dispatch(actionSetUrl('projects'));
    })
    
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>EditProject</IonTitle>
          <IonButtons slot="end">
            <IonButton color="danger" onClick={() => {
                dispatch(actionClearEditProject());
                dispatch(actionSetUrl('projects'))
            }}>back</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='projects-container'>
          <div className='projects-inner-container'>
            <IonCard className='shadow-2 pa2 ma2 tc'>
              <form onSubmit={handleSubmit}>
                <IonList>
                  <IonItem>
                    <IonLabel position="stacked">Project Name :</IonLabel>
                    <IonInput
                      required
                      type="text"
                      clearInput={true}
                      value={name}
                      onIonChange={(e) => setName(e.detail.value)}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">
                      Project Description :
                    </IonLabel>
                    <IonTextarea
                      value={projectDescription}
                      onIonChange={(e) => setProjectDescription(e.detail.value)}
                    />
                  </IonItem>
                </IonList>
                <br/>
                <IonButton type="submit">Save Changes</IonButton>
              </form>
            </IonCard>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EditProject;

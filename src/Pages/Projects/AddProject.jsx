import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import {useDispatch , useSelector} from 'react-redux';
import { useState } from 'react';
import { actionSetAllProjects, actionSetUrl } from '../../actions';
import { addToDatabase } from '../../backend/database';
import './Projects.css'
const AddProject = () => {

    const dispatch = useDispatch();
    const [name,setName] = useState(null);
    const [projectDescription , setProjectDiscription] = useState(null);
    const userUID = useSelector(state => state.loginReducer.userUID);
    const allProjects = useSelector(state => state.projectsReducer.allProjects);
    

    function compare(a,b) {
        const idA = parseInt(a);
        const idB = parseInt(b);
        let comparison = 0;
        if(idA > idB){
            comparison = 1;
        }else if (idA < idB){
            comparison = -1;
        }
        return comparison;
    }

    allProjects.sort(compare);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {name,projectDescription};
        let id = 0;
        if(allProjects.length === 0){
            id = 1;
        }else{
            id = allProjects[allProjects.length - 1].id + 1; 
        }
        addToDatabase("Users/" + userUID + '/Projects' ,id.toString(),data).then(
            (data) => {
                dispatch(actionSetAllProjects(data))
                dispatch(actionSetUrl('projects'))
            }
        )
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className='fw6'>
                        Add Project
                    </IonTitle>
                    <IonButtons slot='end'>
                        <IonButton color='danger'
                            onClick={() => dispatch(actionSetUrl('projects'))}
                        >
                            back
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className='projects-container'>
                    <div className='projects-inner-container'>
                        <IonCard className='tc'>
                        <form onSubmit={handleSubmit}>
                        <IonList className='shadow-2'>
                            <IonItem>
                                <IonLabel position='stacked'>Project Name :</IonLabel>
                                <IonInput
                                    required
                                    clearInput={true}
                                    type='text'
                                    value={name}
                                    onIonChange={(e) => setName(e.detail.value)} 
                                />
                            </IonItem>
                            <IonItem>
                                <IonLabel position='stacked'>
                                    Project Description :
                                </IonLabel>
                                <IonTextarea
                                    value={projectDescription}
                                    onIonChange={(e) => setProjectDiscription(e.detail.value)}
                                />
                            </IonItem>
                            <br/>
                            <IonButton type='submit'>Add Project</IonButton>
                        </IonList>
                        </form>
                        </IonCard>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default AddProject;
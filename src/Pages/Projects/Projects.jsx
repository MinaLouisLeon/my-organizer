import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonPopover, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SideMenu from '../../Components/SideMenu/SideMenu';
import AddProject from '../../Components/Projects/AddProject';

const Projects = () => {

    const dispatch = useDispatch();

    const [addProjectPopoverState,setAddProjectPopoverState] = useState({
        addProjectShowPopover : false,
        event : undefined
    });

    const handleAddProject = (e) => {
        e.persist();
        setAddProjectPopoverState({
            addProjectShowPopover : true,
            event : e
        })
    }

    return (
        <IonPage>
            <SideMenu />
            <IonPopover
                event={addProjectPopoverState.event}
                isOpen={addProjectPopoverState.addProjectShowPopover}
                onDidDismiss={() => setAddProjectPopoverState({
                    addProjectShowPopover : false,
                    event : undefined
                })}
            >
                {/* TODO add the list project component */}
                <AddProject />
            </IonPopover>
            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot='start'/>
                    <IonTitle className='fw6 black'>
                        Projects
                    </IonTitle>
                    <IonButtons slot='end'>
                        <IonButton color='primary' onClick={(e) => handleAddProject(e)}>
                            add project
                        </IonButton>
                        <IonButton color='danger'>
                            logout
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen id='enableSideMenu'>
                <div className='projects-container'>
                    <div className='projects-inner-container'>
                        {/* TODO add project list */}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Projects;
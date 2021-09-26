import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonPopover, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import SideMenu from '../../Components/SideMenu/SideMenu';
import './Projects.css';
import ListProjects from '../../Components/Projects/ListProjects';
import { actionLoggedOut, actionSetUrl } from '../../actions';
const Projects = () => {

    const dispatch = useDispatch();

    return (
        <IonPage>
            <SideMenu />
            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot='start'/>
                    <IonTitle className='fw6'>
                        Projects
                    </IonTitle>
                    <IonButtons slot='end'>
                        <IonButton color='primary' onClick={() => dispatch(actionSetUrl('addProject'))}>
                            add project
                        </IonButton>
                        <IonButton color='danger' onClick={() => dispatch(actionLoggedOut())}>
                            logout
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen id='enableSideMenu'>
                <div className='projects-container'>
                    <div className='projects-inner-container'>
                        <ListProjects />
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Projects;
import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SideMenu from '../Components/SideMenu/SideMenu';
import { useDispatch } from 'react-redux';
import { actionLoggedOut } from '../actions';
import { createNewUser } from '../backend/database';
const MainView = () => {

    const dispatch = useDispatch();

    const testDatabase = () => {
        createNewUser();
    }

    return (
        <IonPage>
        <SideMenu />
            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot='start' />
                    <IonTitle>Home</IonTitle>
                    <IonButtons slot='end' >
                        <IonButton color='danger' onClick={() => dispatch(actionLoggedOut())}>
                            logout
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen id='enableSideMenu'>
                <IonButton onClick={() => testDatabase()} >Test Database</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default MainView;
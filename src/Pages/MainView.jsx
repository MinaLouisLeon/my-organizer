import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SideMenu from '../Components/SideMenu/SideMenu';
import { useDispatch } from 'react-redux';
import { actionLoggedOut } from '../actions';

const MainView = () => {

    const dispatch = useDispatch();

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

            </IonContent>
        </IonPage>
    )
}

export default MainView;
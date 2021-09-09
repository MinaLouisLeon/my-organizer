import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SideMenu from '../Components/SideMenu/SideMenu';
const MainView = () => {
    return (
        <IonPage>
        <SideMenu />
            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot='start' />
                    <IonTitle>Main View</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen id='enableSideMenu'>

            </IonContent>
        </IonPage>
    )
}

export default MainView;
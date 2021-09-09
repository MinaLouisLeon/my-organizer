import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonTitle, IonToolbar } from '@ionic/react';
import { useDispatch } from 'react-redux';
import { actionSetUrl , actionSetAllTasks} from '../../actions';
const SideMenu = () => {

    const dispatch = useDispatch();

    const handleAllTasks = () => {
        fetch(window.serverIp + '/get-tasks',{
            method : "POST"
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            dispatch(actionSetAllTasks(data))
            dispatch(actionSetUrl('allTasks'))
        })
    }

    return(
        <IonMenu contentId="enableSideMenu">
            <IonHeader>
                <IonToolbar mode='ios'>
                    <IonTitle>
                        Menu
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem button onClick={() => dispatch(actionSetUrl('/'))}>
                        <IonLabel>
                            Home
                        </IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => handleAllTasks()}>
                        <IonLabel>
                            All Tasks
                        </IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonMenu>
    )
}
export default SideMenu;
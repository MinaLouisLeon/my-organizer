import { IonButton, IonItem, IonLabel, IonList } from '@ionic/react'
import { useSelector , useDispatch} from 'react-redux';
import { actionSetAllTasks } from '../../actions';
const ListTasks = () => {

    const dispatch = useDispatch();
    const allTasks = useSelector(state => state.tasksReducer.allTasks);
    
    const handleDelete = (id) => {
        const idObj = {id};
        fetch(window.serverIp + '/delete-task',{
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify(idObj)
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            dispatch(actionSetAllTasks(data))
        })
    }

    return (
        <>
            <IonList>
                {allTasks.map((task) => {
                    return(
                        <IonItem>
                            <IonLabel>
                                {task.Task}
                            </IonLabel>
                            <IonButton color='danger' onClick={() => handleDelete(task.id)}>Delete</IonButton>
                        </IonItem>
                    )
                })}
            </IonList>
        </>
    )
}

export default ListTasks;
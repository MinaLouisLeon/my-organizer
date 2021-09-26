import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { FrappeGantt } from 'frappe-gantt-react';
import SideMenu from '../../Components/SideMenu/SideMenu';
import { useSelector } from 'react-redux';
const GanttChart = () => {

    const AllTasks = useSelector(state => state.tasksReducer.allTasks);

    return(
        <IonPage>
            <SideMenu />
            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot='start'/>
                    <IonTitle className='fw6 black'>
                        Gantt Chart
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen id='enableSideMenu'>
                <div>
                <FrappeGantt 
                    tasks={AllTasks}
                    
                    onClick={(task) => console.log(task)}
                    onDateChange={(task,start,end) => console.log(task,start,end)}
                    onProgressChange={(task,progress) => console.log(task,progress)}
                    onTasksChange={tasks => console.log(tasks)}
                />
                </div>
            </IonContent>
        </IonPage>
    )
}

export default GanttChart;
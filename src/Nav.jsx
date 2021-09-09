import { IonApp } from "@ionic/react";
import { useSelector } from "react-redux";
import AllTasks from "./Pages/Tasks/AllTasks";
import MainView from "./Pages/MainView";
import GanttChart from "./Pages/Tasks/GanttChart";
const Nav = () => {

    const pageUrl = useSelector(state => state.pageNavReducer.url);

    const handleNavigation = () => {
        switch(pageUrl){
            case '/':
                return(<MainView />)
            case 'allTasks' :
                return(<AllTasks />)
            case 'ganttChart' :
                return(<GanttChart />)
            default :
                return(<MainView />)
        }
    }

    return(
        <IonApp>
            {handleNavigation()}
        </IonApp>
    )

}

export default Nav;
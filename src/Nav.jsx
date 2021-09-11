import { IonApp } from "@ionic/react";
import { useSelector } from "react-redux";
import AllTasks from "./Pages/Tasks/AllTasks";
import MainView from "./Pages/MainView";
import GanttTimeLine from "./Pages/Tasks/GanttTimeLine";
import Login from "./Pages/Login/Login";
const Nav = () => {

    const pageUrl = useSelector(state => state.pageNavReducer.url);

    const handleNavigation = () => {
        switch(pageUrl){
            case '/':
                return(<Login />)
                // return(<MainView />)
            case 'allTasks' :
                return(<AllTasks />)
            case 'ganttChart' :
                return(<GanttTimeLine />)
            case 'home' :
                return(<MainView />)
            default :
                return(<Login />)
                // return(<MainView />)
        }
    }

    return(
        <IonApp>
            {handleNavigation()}
        </IonApp>
    )

}

export default Nav;
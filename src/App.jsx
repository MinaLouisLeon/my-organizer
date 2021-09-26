import {IonPage} from '@ionic/react';
import { useSelector } from "react-redux";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Home from './Pages/Home';
import AllTasks from "./Pages/Tasks/AllTasks";
import GanttTimeLine from "./Pages/Tasks/GanttTimeLine";
import Login from "./Pages/Login/Login";
import Projects from "./Pages/Projects/Projects";
import EditTask from "./Pages/Tasks/EditTask";
import AddProject from "./Pages/Projects/AddProject";
import EditProject from './Pages/Projects/EditProject';
const App = () => {

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
            return(<Home />)
        case 'projects' :
            return(<Projects />)
        case 'editTask' : 
            return(<EditTask />)
        case 'addProject':
            return(<AddProject />)
        case 'editProject' :
            return(<EditProject />)
        default :
            return(<Login />)
            // return(<MainView />)
    }
}

  return (
    <IonPage>
      {handleNavigation()}
    </IonPage>
  )
}

export default App;

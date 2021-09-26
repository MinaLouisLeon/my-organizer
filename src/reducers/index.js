import { combineReducers } from "redux";
import pageNavReducer from "./pageNavReducer";
import tasksReducer from "./tasksReducer";
import loginReducer from "./loginReducer";
import projectsReducer from "./projectsReducer";
const allReducers = combineReducers({
    pageNavReducer,
    tasksReducer,
    loginReducer,
    projectsReducer
})

export default allReducers;
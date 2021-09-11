import { combineReducers } from "redux";
import pageNavReducer from "./pageNavReducer";
import tasksReducer from "./tasksReducer";
import loginReducer from "./loginReducer";
const allReducers = combineReducers({
    pageNavReducer,
    tasksReducer,
    loginReducer
    
})

export default allReducers;
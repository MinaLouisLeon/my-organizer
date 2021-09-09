import { combineReducers } from "redux";
import pageNavReducer from "./pageNavReducer";
import tasksReducer from "./tasksReducer";
const allReducers = combineReducers({
    pageNavReducer,
    tasksReducer
})

export default allReducers;
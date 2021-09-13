const initialState = {
    allTasks : [],
    links : []
}

const tasksReducer = (state=initialState,action) => {
    switch(action.type){
        case 'setAllTasks' :
            return {
                ...state,
                allTasks : action.payload,
            }
        case 'setTasksLinks' :
            return {
                ...state,
                links : action.payload,
            }
        case 'loggedOut' :
            return {
                ...state,
                allTasks : [],
                links : []
            }
        default :
            return state
    }
}

export default tasksReducer;
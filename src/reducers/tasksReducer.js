const initialState = {
    allTasks : []
}

const tasksReducer = (state=initialState,action) => {
    switch(action.type){
        case 'setAllTasks' :
            return {
                ...state,
                allTasks : action.payload
            }
        default :
            return state
    }
}

export default tasksReducer;
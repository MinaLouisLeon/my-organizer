const initialState = {
    allTasks : [],
    links : [],
    editTask : [
        {
            id : 0,
            data : []
        }
    ],
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
        case 'setEditTask' :
            return {
                ...state,
                editTask :  [
                    {
                        id : action.id,
                        data : action.data
                    }
                ],
            }
        case 'clearEditTask' : 
            return {
                ...state,
                editTask : [
                    {
                        id : 0,
                        data : []
                    }
                ]
            }
        case 'loggedOut' :
            return {
                ...state,
                allTasks : [],
                links : [],
                editTask : [
                    {
                        id : 0,
                        data : []
                    }
                ],
            }
        default :
            return state
    }
}

export default tasksReducer;
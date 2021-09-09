//pageNavReducer

export const actionSetUrl = (args) => {
    return {
        type : 'setUrl',
        payload : args
    }
}

//tasksReducer

export const actionSetAllTasks = (args) => {
    return {
        type : 'setAllTasks',
        payload : args
    }
}
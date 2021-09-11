
//loginReducer

export const actionLoggedIn = (args) => {
    return {
        type : 'loggedIn',
        payload : args
    }
}

export const actionLoggedOut = () => {
    return {
        type : 'loggedOut'
    }
}

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
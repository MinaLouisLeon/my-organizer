
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

//projectsReducer

export const actionSetAllProjects = (args) => {
    return{
        type : 'setAllProjects',
        payload : args
    }
}

export const actionSetProjectsLinks = (args) => {
    return{
        type : 'setProjectsLinks',
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

export const actionSetTasksLinks = (args) => {
    return {
        type : 'setTasksLinks',
        payload : args
    }
}


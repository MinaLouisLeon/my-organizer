
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

export const actionSetEditProject = (id,data) => {
    return{
        type : 'setEditProject',
        id : id,
        data : data
    }
}

export const actionClearEditProject = () => {
    return{
        type : 'clearEditProject'
    }
}

export const actionSetOpenProject = (id,data) => {
    return{
        type : 'setOpenProject',
        id : id,
        data : data
    }
}

export const actionClearOpenProject = () => {
    return{
        type : 'clearOpenProject'
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

export const actionSetEditTask = (id,data) => {
    return{
        type : 'setEditTask',
        id : id,
        data : data
    }
}

export const actionClearEditTask = () => {
    return{
        type : 'clearEditTask'
    }
}
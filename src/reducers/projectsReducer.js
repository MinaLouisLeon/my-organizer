const initialState = {
    allProjects : [],
    links : []
}

const projectsReducer = (state=initialState,action) => {
    switch(action.type){
        case 'setAllProjects' :
            return{
                ...state,
                allProjects : action.payload
            }
        case 'setProjectsLinks' :
            return{
                ...state,
                links : action.payload
            }
        case 'loggedOut' :
            return{
                ...state,
                links : [],
                allProjects : []
            }
        default :
            return state
    }
}

export default projectsReducer;
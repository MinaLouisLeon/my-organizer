const initialState = {
    url : '/'
}

const pageNavReducer = (state=initialState,action) => {
    switch(action.type){
        case 'loggedIn' :
            return{
                ...state,
                url : 'home'
            }
        case 'setUrl' :
            return {
                ...state,
                url : action.payload
            }
        case 'loggedOut' :
            return{
                ...state,
                url : '/'
            }
        default :
            return state
    }
}

export default pageNavReducer;
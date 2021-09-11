
const initialState = {
    userUID : '',
    isLoggedIn : false
}

const loginReducer = (state=initialState,action) => {
    switch(action.type){
        case 'loggedIn' :
            return {
                ...state,
                userUID : action.payload,
                isLoggedIn : true
            }
        case 'loggedOut' :
            return {
                ...state,
                userUID : '',
                isLoggedIn : false 
            }
        default :
            return state
    }
}

export default loginReducer;
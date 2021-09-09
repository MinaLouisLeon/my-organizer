const initialState = {
    url : '/'
}

const pageNavReducer = (state=initialState,action) => {
    switch(action.type){
        case 'setUrl' :
            return {
                ...state,
                url : action.payload
            }
        default :
            return state
    }
}

export default pageNavReducer;
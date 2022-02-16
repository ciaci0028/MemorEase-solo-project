const activePhotoReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_ACTIVE_PHOTO':
            return action.payload;
        case 'UPDATE_ACTIVE_PHOTO':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default activePhotoReducer;
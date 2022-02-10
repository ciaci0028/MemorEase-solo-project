const activePhotoReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_ACTIVE_PHOTO':
            return action.payload;
        default:
            return state;
    }
};

export default activePhotoReducer;
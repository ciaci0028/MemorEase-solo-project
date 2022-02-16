const uploadTagsReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_UPLOAD_TAGS':
            return [...state, action.payload];
        case 'SET_EDIT_TAGS':
            return [...action.payload];
        case 'DELETE_UPLOAD_TAGS':
            let tempArray = [];
            for (let tag of state) {
                if (tag !== action.payload){
                    tempArray.push(tag);
                }
            }
            return tempArray;
        case 'CLEAR_UPLOAD_TAGS':
            let clearState = [];
            return clearState;
        default:
            return state;

    }
};

export default uploadTagsReducer;
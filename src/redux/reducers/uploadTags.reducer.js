const uploadTagsReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_UPLOAD_TAGS':
            return [...state, action.payload];
        case 'DELETE_UPLOAD_TAGS':
            let tempArray = [];
            for(let tag of state){
                if (tag === action.payload){
                    tempArray.push(action.payload);
                }
            }
            return tempArray;
        default:
            return state;

    }
};

export default uploadTagsReducer;
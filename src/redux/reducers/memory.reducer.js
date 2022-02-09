const memoryReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_MEMORY':
            return action.payload;
        default:
            return state;
    }
};

export default memoryReducer;
export const alertReducer = (state, action) => {
    switch (action.type) {
        case "close":
            clearTimeout(state.timeout);
            return { ...state, display: false };
        case "open":
            return {
                display: true,
                message: action.alert.message,
                timeout: action.alert.timeout,
                type: action.alert.type,
            };
        default:
            return state;
    }
};

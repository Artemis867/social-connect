const defaultState = {
  active: false,
  content: "",
  error: false,
};

const toastReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SHOWTOAST":
      return {
        active: true,
        content: action.payload?.content,
        error: action.payload?.error,
        action: action.payload?.action,
      };
    case "CLOSETOAST":
      return defaultState;
    default:
      return state;
  }
};

export default toastReducer;

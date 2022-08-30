const initialState = {
  restinfo: [],
  clickinfo: null,
  length: 0,
};

function restReducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_RESTINFO":
      return {
        ...state,
        restinfo: action.payload,
      };
    case "CHANG_INFOLEN":
      return {
        ...state,
        length: action.payload,
      };

    case "CHANGE_CLICKINFO":
      return {
        ...state,
        clickinfo: action.payload,
      };

    default:
      return state;
  }
}

export default restReducer;

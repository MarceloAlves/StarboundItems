export const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_ITEMS":
      return action.items;
    default:
      return state;
  }
};

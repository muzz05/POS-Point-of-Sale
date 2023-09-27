const initialState = {
  loading: false,
  cartItems: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Show_Loading":
      return {
        ...state,
        loading: true,
      };
    case "Hide_Loading":
      return {
        ...state,
        loading: false,
      };
    case "Add_To_Cart":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "Update_Cart":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "Remove_From_Cart":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    case "Delete_Cart":
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

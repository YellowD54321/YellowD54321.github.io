export const initialState = {
  searchText: "",
  searchBtnCount: 0,
  cocktailInfo: {},
  user: {},
  favouriteList: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_TEXT":
      return {
        ...state,
        searchText: action.item.text,
        searchBtnCount: action.item.btnCounter,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "COCKTAIL_INFO":
      return {
        ...state,
        cocktailInfo: action.item.cocktailInfo,
      };
    case "FAVOURITE_LIST":
      return {
        ...state,
        favouriteList: action.item.favouriteList,
      };
    default:
      return state;
  }
};

export default reducer;

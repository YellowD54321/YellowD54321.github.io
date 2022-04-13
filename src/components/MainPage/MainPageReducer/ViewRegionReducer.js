export const initialState = {
  oldFasionImages: {},
  viewRegion: null,
};

const viewRegionReducer = (state, action) => {
  switch (action.type) {
    case "SET_IMAGE":
      return {
        ...state,
        oldFasionImages: action.item.oldFasionImages,
      };
    case "SET_VIEW_REGION":
      return {
        ...state,
        viewRegion: action.item.viewRegion,
      };
    default:
      return state;
  }
};

export default viewRegionReducer;

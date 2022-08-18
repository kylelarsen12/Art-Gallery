import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objectId: 10245,
  apiData: {},
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      return { ...state, apiData: action.payload };
    },
    clearData: () => {
      return initialState;
    },
    customId: (state, action) => {
      return { ...state, objectId: action.payload };
    },
    incrementId: (state) => {
      return { ...state, objectId: state.objectId + 1 };
    },
    decrementId: (state) => {
      return { ...state, objectId: state.objectId - 1 };
    },
  },
});

export const { setData, clearData, customId, incrementId, decrementId } =
  dataSlice.actions;

export const fetchData = () => {
  const fetchThunk = async (dispatch, getState) => {
    let state = getState();
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`
    );
    const resData = await response.json();
    dispatch(setData(resData));
  };
  return fetchThunk;
};

export default dataSlice.reducer;

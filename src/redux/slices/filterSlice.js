import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: { name: "популярности (DESC)", sortProperty: "rating" },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action){
        state.sort = action.payload;
    },
    setCurrentPage(state, action){
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSortType, setCurrentPage } = filterSlice.actions;
export default filterSlice.reducer;

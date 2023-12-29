import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/posts';
import { CreatedPost } from '../../types/posts';
import L from 'leaflet';

type PostState = {
  posts: CreatedPost[];
  selectedPosts: number[];
  showAddForm: boolean;
  currentPost: null | CreatedPost;
  mapCenter: L.LatLngExpression;
};

const initialState: PostState = {
  posts: [],
  selectedPosts: [],
  showAddForm: false,
  currentPost: null,
  mapCenter: [45, 2],
};

const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {
    fetchAllPosts: (state, action: PayloadAction<CreatedPost[]>) => {
      state.posts = [...action.payload];
      state.selectedPosts = state.posts.map((post) => post.id);
    },
    //for selecting the points from the table and showing them on the webpage (selection based on ids)
    selectPosts: (state, action: PayloadAction<number[]>) => {
      state.selectedPosts = [...action.payload];
    },
    addPost: (state, action: PayloadAction<CreatedPost>) => {
      state.posts = [...state.posts, action.payload];
      state.selectedPosts = [...state.selectedPosts, action.payload.id];
    },

    updateOnePost: (state, action: PayloadAction<CreatedPost>) => {
      state.posts = state.posts.map((post: CreatedPost) =>
        post.id === action.payload.id ? action.payload : post
      );
      // state.selectedPosts = state.selectedPosts.map((post: CreatedPost) =>
      //   post.id === action.payload.id ? action.payload : post
      // );
    },

    updateMapCenter: (state, action: PayloadAction<L.LatLngExpression>) => {
      state.mapCenter = action.payload;
    },

    deleteOnePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },

    clickShowAddForm: (state) => {
      state.showAddForm = !state.showAddForm;
    },

    selectCurrentPost: (state, action: PayloadAction<CreatedPost | null>) => {
      state.currentPost = action.payload;
    },
  },
});

export const {
  fetchAllPosts,
  selectPosts,
  addPost,
  updateOnePost,
  updateMapCenter,
  deleteOnePost,
  clickShowAddForm,
  selectCurrentPost,
} = postSlice.actions;
export default postSlice.reducer;

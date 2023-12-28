import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/posts';
import { CreatedPost } from '../../types/posts';

type PostState = {
  posts: CreatedPost[];
  selectedPosts: number[];
  showAddForm: boolean;
  currentPost: null | CreatedPost;
};

const initialState: PostState = {
  posts: [],
  selectedPosts: [],
  showAddForm: false,
  currentPost: null,
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
    },

    updateOnePost: (state, action: PayloadAction<CreatedPost>) => {
      state.posts = state.posts.map((post: CreatedPost) =>
        post.id === action.payload.id ? action.payload : post
      );
      // state.selectedPosts = state.selectedPosts.map((post: CreatedPost) =>
      //   post.id === action.payload.id ? action.payload : post
      // );
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
  deleteOnePost,
  clickShowAddForm,
  selectCurrentPost,
} = postSlice.actions;
export default postSlice.reducer;

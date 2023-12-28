import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/posts';
import { CreatedPost } from '../../types/posts';

type PostState = {
  posts: CreatedPost[];
  showAddForm: boolean;
  currentPost: null | CreatedPost;
};

const initialState: PostState = {
  posts: [],
  showAddForm: false,
  currentPost: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {
    fetchAllPosts: (state, action: PayloadAction<CreatedPost[]>) => {
      state.posts = [...action.payload];
    },
    addPost: (state, action: PayloadAction<CreatedPost>) => {
      state.posts = [...state.posts, action.payload];
    },

    updateOnePost: (state, action: PayloadAction<CreatedPost>) => {
      console.log(action.payload);
      state.posts = state.posts.map((post: CreatedPost) =>
        post.id === action.payload.id ? action.payload : post
      );
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
  addPost,
  updateOnePost,
  deleteOnePost,
  clickShowAddForm,
  selectCurrentPost,
} = postSlice.actions;
export default postSlice.reducer;

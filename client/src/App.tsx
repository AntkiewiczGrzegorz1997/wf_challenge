import React, { useState, useEffect } from 'react';
import AddUpdatePostForm from './components/AddUpdatePostForm';
import './App.css';
import { getPosts } from './apiService';
import { Post, CreatedPost } from './types/posts';
import Table from './components/Table';
import { AppDispatch, RootState } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { clickShowAddForm, fetchAllPosts } from './redux/post';
import Map from './components/Map';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const showAddForm: boolean = useSelector(
    (state: RootState) => state.post.showAddForm
  );

  useEffect(() => {
    getPosts().then((data) => {
      if (data) {
        dispatch(fetchAllPosts(data));
      }
    });
  }, []);

  return (
    <div>
      <div className='navBar'></div>
      <button onClick={() => dispatch(clickShowAddForm())}>Create Post</button>
      <Map />

      {/* <AddPostForm setPosts={setPosts} /> */}
      <Table />
      {}
      {showAddForm && <AddUpdatePostForm />}
    </div>
  );
}

export default App;

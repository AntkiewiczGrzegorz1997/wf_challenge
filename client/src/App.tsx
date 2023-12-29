import React, { useState, useEffect } from 'react';
import AddUpdatePostForm from './components/AddUpdatePostForm';
import Navbar from './components/Navbar';
import './App.css';
import { getPosts, getCountryFromCoordinates } from './apiService';
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
    getPosts().then(async (data: CreatedPost[] | undefined) => {
      if (data) {
        //first adding the fetched Posts to redux.
        dispatch(fetchAllPosts(data));

        //in normal circumstances I would store the country in a database because this process is slow
        // const postsWithCountry: CreatedPost[] = await Promise.all(
        //   data.map(async (post: CreatedPost) => {
        //     const country =
        //       post.lat && post.long
        //         ? await getCountryFromCoordinates(post.lat, post.long)
        //         : 'Unknown';
        //     return { ...post, country };
        //   })
        // );
        // console.log(postsWithCountry);
        // dispatch(fetchAllPosts(postsWithCountry));
      }
    });
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Table />
      {showAddForm && <AddUpdatePostForm />}

      <Map />

      {/* <AddPostForm setPosts={setPosts} /> */}

      {}
    </div>
  );
}

export default App;

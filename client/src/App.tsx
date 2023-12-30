import React, { useEffect } from 'react';
import AddUpdatePostForm from './components/AddUpdatePostForm';
import Header from './components/Header';
import './App.css';
import { getPosts } from './apiService';
import { CreatedPost } from './types/posts';
import Table from './components/Table';
import { AppDispatch, RootState } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from './redux/post';
import Map from './components/Map';

function App(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const showAddForm: boolean = useSelector(
    (state: RootState) => state.post.showAddForm
  );

  useEffect(() => {
    getPosts().then(async (data: CreatedPost[] | undefined) => {
      if (data) {
        dispatch(fetchAllPosts(data));
      }
    });
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className='map-table-container'>
        <Map />
        <Table />
        {showAddForm && <AddUpdatePostForm />}
      </div>
    </div>
  );
}

export default App;

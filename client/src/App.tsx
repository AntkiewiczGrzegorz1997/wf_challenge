import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import AddPostForm from './components/AddPostForm';
import './App.css';
import { getPosts } from './apiService';
import { Post } from './types/posts';

function App() {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    getPosts().then((res) => {
      setPosts(res);
    });
  }, []);

  return (
    <div>
      <AddPostForm setPosts={setPosts} />
    </div>
  );
}

export default App;

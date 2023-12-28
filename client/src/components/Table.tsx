import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { CreatedPost } from '../types/posts';
import { deletePost } from '../apiService';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import '../styles/Table.css';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  clickShowAddForm,
  selectCurrentPost,
  deleteOnePost,
} from '../redux/post';

// type TableProps = {
//   posts: CreatedPost[];
//   setPosts: (posts: CreatedPost[]) => void;
// };

export default function Table() {
  const dispatch: AppDispatch = useDispatch();
  const posts: CreatedPost[] = useSelector(
    (state: RootState) => state.post.posts
  );
  const handleDelete = (id: number) => {
    //first delete from DB
    deletePost(id.toString())
      .then(() => {
        //after delete from Redux
        dispatch(deleteOnePost(id));
      })
      .catch((e) => {
        console.error('Error deleting post:', e);
      });
  };

  const handleUpdate = (id: number) => {
    const selectedPost: CreatedPost | undefined = posts.find(
      (post: CreatedPost) => id === post.id
    );
    if (selectedPost !== undefined) {
      dispatch(selectCurrentPost(selectedPost));
    }

    dispatch(clickShowAddForm());
  };

  const columns = [
    {
      name: 'Title',
      selector: (row: CreatedPost) => row.title,
    },
    {
      name: 'Content',
      selector: (row: CreatedPost) => row.content,
    },
    {
      name: 'Latitude',
      selector: (row: CreatedPost) => row.lat,
    },
    {
      name: 'Longitude',
      selector: (row: CreatedPost) => row.long,
    },
    {
      name: 'Actions',
      button: true,
      cell: (row: CreatedPost) => (
        <>
          <button onClick={() => handleDelete(row.id)}>
            <BsFillTrashFill className='delete-btn' />
          </button>
          <button onClick={() => handleUpdate(row.id)}>
            <BsFillPencilFill className='update-btn' />
          </button>
        </>
      ),
    },
  ];

  return (
    <div>
      <DataTable title='Blog posts' columns={columns} data={posts} />
    </div>
  );
}

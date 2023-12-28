import React, { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
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
  selectPosts,
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

  //customizing the columns for the tables
  const columns: TableColumn<CreatedPost>[] = [
    {
      name: 'Title',
      selector: (row: CreatedPost) => row.title,
      maxWidth: '10vw',
      // style: { maxWidth: '2vw' },
      sortable: true,
    },
    {
      name: 'Image',
      selector: (row: CreatedPost) => row.image_url,
      cell: (row: CreatedPost) => (
        <img
          src={row.image_url}
          // if there is no url provided or the url is wrong I use a default kitty image
          onError={(e) => {
            e.currentTarget.src = 'https://placekitten.com/100/70';
            e.currentTarget.alt = 'default image';
          }}
          alt={row.title}
          style={{ width: '100px', height: '70px' }}
          // style={{ width: '7vw', height: '5vw' }}
        />
      ),
      maxWidth: '10vw',
    },
    {
      name: 'Content',
      selector: (row: CreatedPost) => row.content,
      maxWidth: '55vw',
    },
    {
      name: 'Latitude',
      selector: (row: CreatedPost) => row.lat,
      maxWidth: '10vw',
    },
    {
      name: 'Longitude',
      selector: (row: CreatedPost) => row.long,
      maxWidth: '10vw',
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
      maxWidth: '10vw',
    },
  ];

  return (
    <div className={'dataTable'}>
      <DataTable
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 7, 9]}
        title='Blog posts'
        columns={columns}
        data={posts}
        highlightOnHover
        pointerOnHover
        selectableRows
        onSelectedRowsChange={(selected) => {
          const selectedIds = selected.selectedRows.map((post) => post.id);
          dispatch(selectPosts(selectedIds)); //might be usefull in the future
        }}
        // onRowClicked={() => {
        //   console.log('clicked'); //might be usefull in the future
        // }}
      />
    </div>
  );
}

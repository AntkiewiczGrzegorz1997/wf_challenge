import React, { useState } from 'react';
import DataTable, {
  TableColumn,
  createTheme,
} from 'react-data-table-component';
import { CreatedPost } from '../types/posts';
import { deletePost } from '../apiService';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { FaPlane } from 'react-icons/fa';

import '../styles/Table.css';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  clickShowAddForm,
  selectCurrentPost,
  deleteOnePost,
  selectPosts,
  updateMapCenter,
} from '../redux/post';

// type TableProps = {
//   posts: CreatedPost[];
//   setPosts: (posts: CreatedPost[]) => void;
// };

// :root {
//   --light-purple: #cecbef;
//   --purple: #501e96;
//   --font-grey: #71706f;
//   --white: #ffffff;
// }

// createTheme(
//   'solarized',
//   {
//     text: {
//       primary: '#268bd2',
//       secondary: '#2aa198',
//     },
//     header: {
//       fontSize: '40px',
//       fontWeight: 'bold',
//     },

//     background: {
//       default: 'rgba(0,0,0,.2)',
//     },
//     context: {
//       background: '#501e96',
//       text: '#FFFFFF',
//     },
//     body: {
//       background: 'rgba(0,0,0,.2)',
//     },

//     divider: {
//       default: '#073642',
//     },
//     action: {
//       button: 'rgba(0,0,0,.2)',
//       hover: 'rgba(0,0,0,.08)',
//       disabled: 'rgba(0,0,0,.12)',
//     },
//   },
//   'dark'
// );

const customStyles = {
  head: {
    style: {
      fontSize: '15px',
      fontWeight: 'bold',
      color: '#000000',
    },
  },

  // headCells: {
  //   style: {
  //     paddingLeft: '8px', // override the cell padding for head cells
  //     paddingRight: '8px',
  //   },
  // },
  // cells: {
  //   style: {
  //     paddingLeft: '8px', // override the cell padding for data cells
  //     paddingRight: '8px',
  //   },
  // },
};

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

  const handleChangeView = (row: CreatedPost) => {
    if (row.lat && row.long) {
      dispatch(updateMapCenter([parseFloat(row.lat), parseFloat(row.long)]));
    } else {
      alert('Changing the View is not possible due to lacking coordinates');
    }
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
      // sortable: true,
    },
    {
      name: 'Image',
      selector: (row: CreatedPost) => row.image_url,
      cell: (row: CreatedPost) => (
        <img
          src={row.image_url}
          // if there is no url provided or the url is wrong I use a default kitty image
          onError={(e) => {
            e.currentTarget.src = 'https://placekitten.com/1000/700';
            e.currentTarget.alt = 'default image';
          }}
          alt={row.title}
          style={{ width: '100%', height: '100%' }}
          // style={{ width: '7vw', height: '5vw' }}
        />
      ),
      maxWidth: '10vw',
    },
    /*{
      name: 'Content',
      selector: (row: CreatedPost) => row.content,
      maxWidth: '55vw',
    },*/
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
            <BsFillTrashFill className={'delete-btn enlarge'} />
          </button>
          <button onClick={() => handleUpdate(row.id)}>
            <BsFillPencilFill className={'update-btn enlarge'} />
          </button>
          <button onClick={() => handleChangeView(row)}>
            <FaPlane className={'flyto-btn enlarge'} />
          </button>
        </>
      ),
      maxWidth: '10vw',
    },
  ];

  return (
    <div className={'dataTable'}>
      <h1>Blog Posts</h1>
      <DataTable
        pagination
        paginationPerPage={7}
        paginationRowsPerPageOptions={[7]}
        title='Blog posts'
        columns={columns}
        data={posts}
        highlightOnHover
        pointerOnHover
        selectableRowSelected={(post) => post.id > 0} // selecting all posts by defualt.
        selectableRows
        selectableRowsHighlight
        onSelectedRowsChange={(selected) => {
          const selectedIds = selected.selectedRows.map((post) => post.id);
          dispatch(selectPosts(selectedIds)); //might be usefull in the future
        }}
        customStyles={customStyles}
        noHeader
        // theme='solarized'

        // onRowClicked={() => {
        //   console.log('clicked'); //might be usefull in the future
        // }}
      />
    </div>
  );
}

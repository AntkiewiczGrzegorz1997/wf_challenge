import DataTable, { TableColumn } from 'react-data-table-component';
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

const customStyles = {
  head: {
    style: {
      fontSize: '15px',
      fontWeight: 'bold',
      color: '#000000',
    },
  },
};

export default function Table(): JSX.Element {
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

  // "Flies" you to the given location
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

  //customizing the columns for the table
  const columns: TableColumn<CreatedPost>[] = [
    {
      name: 'Title',
      selector: (row: CreatedPost) => row.title,
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
        />
      ),
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
    },
  ];

  return (
    <div className={'dataTable'}>
      <div className='tabletop'>
        <p className='destinationtext'>Destinations</p>
        <button
          className={'addbutton enlargesmall'}
          onClick={() => {
            dispatch(clickShowAddForm());
          }}
          id={'button1'}
        >
          Add Destination
        </button>
      </div>
      <DataTable
        pagination
        paginationPerPage={7}
        paginationRowsPerPageOptions={[7]}
        columns={columns}
        data={posts}
        highlightOnHover
        selectableRowSelected={(post) => post.id > 0} // selecting all posts by defualt.
        selectableRows
        selectableRowsHighlight
        onSelectedRowsChange={(selected) => {
          const selectedIds = selected.selectedRows.map((post) => post.id);
          dispatch(selectPosts(selectedIds));
        }}
        customStyles={customStyles}
        noHeader
      />
    </div>
  );
}

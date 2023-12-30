import React, { useState, ChangeEvent } from 'react';
import TextInputBox from './TextInputBox';
import { Post, CreatedPost } from '../types/posts';
import { isValidCoordinate } from '../utils/validateLatLon';
import '../styles/AddUpdatePostForm.css';
import { createPost, updatePost } from '../apiService';
import { BsX } from 'react-icons/bs';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  clickShowAddForm,
  selectCurrentPost,
  addPost,
  updateOnePost,
} from '../redux/post';

const AddUpdatePostForm = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();

  const currentPost: CreatedPost | null = useSelector(
    (state: RootState) => state.post.currentPost
  );

  const emptyForm: Post = {
    title: '',
    content: '',
    lat: '',
    long: '',
    image_url: '',
  };

  // decide whether the form is used for update for creating a new post
  const initialPostState = currentPost ? currentPost : emptyForm;
  const [post, setPost] = useState<Post>(initialPostState);
  const isSubmitDisabled: boolean = !post.title.trim() || !post.content.trim();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // data validation step for longitude and latitude
    if (post.lat && !isValidCoordinate('lat', post.lat)) {
      alert('Invalid latitude. Please enter a value between -90 and 90.');
      return;
    }
    if (post.long && !isValidCoordinate('long', post.long)) {
      alert('Invalid longitude. Please enter a value between -180 and 180.');
      return;
    }

    //based of for what the form is used (create a Post or Update a post) we update a post or create a new one
    if (currentPost) {
      //first update the post in the DB
      updatePost(currentPost.id, post).then((data: CreatedPost | undefined) => {
        if (data) {
          //secondly update the redux
          dispatch(updateOnePost(data));
        }
      });

      //erase the currentPost upon form submission for update
      dispatch(selectCurrentPost(null));

      //only for update behaviour the form is closing after the update automatically
      dispatch(clickShowAddForm());
    } else {
      createPost(post).then((data) => {
        if (data) {
          dispatch(addPost(data));
        }
      });
    }
    setPost(emptyForm);
  };

  return (
    <div className='overlay'>
      <div className='addPostFormContainer'>
        <button
          className={'closeButton enlarge'}
          onClick={() => {
            dispatch(clickShowAddForm());
            dispatch(selectCurrentPost(null));
          }}
        >
          <BsX />
        </button>

        <form className='form-container' onSubmit={handleSubmit}>
          <h2>
            {currentPost ? 'Update your Destination' : 'Create a Destination'}
          </h2>
          <TextInputBox
            label='Title'
            placeholder='Enter title'
            name='title'
            value={post.title}
            onChange={handleChange}
          />
          <TextInputBox
            label='Content'
            placeholder='Enter content'
            name='content'
            value={post.content}
            onChange={handleChange}
          />
          <TextInputBox
            label='Latitude'
            placeholder='Enter latitude (-90 to 90)'
            name='lat'
            value={post.lat || ''}
            onChange={handleChange}
          />
          <TextInputBox
            label='Longitude'
            placeholder='Enter longitude (-180 to 180)'
            name='long'
            value={post.long || ''}
            onChange={handleChange}
          />
          <TextInputBox
            label='Image URL'
            placeholder='Enter image URL'
            name='image_url'
            value={post.image_url || ''}
            onChange={handleChange}
          />
          <button
            className='submit-button'
            type='submit'
            disabled={isSubmitDisabled}
          >
            {currentPost ? 'Update Destination' : 'Add Destination'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUpdatePostForm;

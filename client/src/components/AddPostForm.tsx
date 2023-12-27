import React, { useState, ChangeEvent } from 'react';
import TextInputBox from './TextInputBox';
import { Post } from '../types/posts';
import { isValidCoordinate } from '../utils/validateLatLon';
import '../styles/AddPostForm.css';
import { createPost } from '../apiService';

// type AddPostFormProps = {
//   setPosts: (posts: Post[]) => void;
// };

const AddPostForm = ({ setPosts }: any) => {
  const [post, setPost] = useState<Post>({
    title: '',
    content: '',
    lat: '',
    long: '',
    image_url: '',
  });

  const isSubmitDisabled: boolean = !post.title.trim() || !post.content.trim();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    createPost(post).then((data) => {
      setPosts((prev: Post[]) => {
        return [...prev, data];
      });
    });

    (e.target as HTMLFormElement).reset();
  };

  return (
    <form className='form-container' onSubmit={handleSubmit}>
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
        Add Post
      </button>
    </form>
  );
};

export default AddPostForm;

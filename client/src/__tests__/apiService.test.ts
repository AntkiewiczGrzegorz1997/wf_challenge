import {
  getPosts,
  createPost,
  deletePost,
  getPost,
  updatePost,
} from '../apiService';
import fetchMock from 'jest-fetch-mock';
import { Post, CreatedPost, UpdatePost } from '../types/posts';

const url: string = 'http://localhost:3000/api/v1/posts';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('apiService', () => {
  it('getPosts fetches and returns data successfully', async () => {
    const mockPosts: CreatedPost[] = [
      {
        id: 1,
        title: 'Test Post',
        content: 'Test Content',
        lat: 'testLat',
        long: 'testLong',
        image_url: '',
        updated_at: '',
        created_at: '',
      },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockPosts));

    const posts = await getPosts();
    expect(fetchMock).toHaveBeenCalledWith(url);
    expect(posts).toEqual(mockPosts);
  });

  it('getPost fetches and returns a single post', async () => {
    const mockPost: CreatedPost = {
      id: 1,
      title: 'Test Post',
      content: 'Test Content',
      lat: 'testLat',
      long: 'testLong',
      image_url: '',
      updated_at: '',
      created_at: '',
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockPost));

    const post = await getPost(mockPost.id.toString());
    expect(fetchMock).toHaveBeenCalledWith(`${url}/${mockPost.id}`);
    expect(post).toEqual(mockPost);
  });

  it('createPost sends a POST request with the correct body', async () => {
    const newPost: Post = { title: 'New Post', content: 'Content' };
    fetchMock.mockResponseOnce(JSON.stringify({ ...newPost, id: 1 }));

    const createdPost = await createPost(newPost);
    expect(fetchMock).toHaveBeenCalledWith(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    });
    expect(createdPost).toEqual({ ...newPost, id: 1 });
  });

  it('deletePost sends a DELETE request', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));

    await deletePost('1');
    expect(fetchMock).toHaveBeenCalledWith(`${url}/1`, {
      method: 'DELETE',
    });
  });

  it('updatePost sends a PUT request with the correct body', async () => {
    const updatedPost: UpdatePost = {
      title: 'Some Updated Post',
      content: 'Some Updated Content',
    };
    fetchMock.mockResponseOnce(JSON.stringify({ ...updatedPost, id: 1 }));

    const response = await updatePost(1, updatedPost);
    expect(fetchMock).toHaveBeenCalledWith(`${url}/1`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    });
    expect(response).toEqual({ ...updatedPost, id: 1 });
  });
});

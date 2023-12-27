import { Post, CreatedPost, UpdatePost } from './types/posts';

const url: string = 'http://localhost:3000/api/v1';

export async function getPosts() {
  try {
    const response = await fetch(`${url}/posts`);
    const data: Post[] = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getPost(id: string) {
  try {
    const response = await fetch(`${url}/posts/${id}`);
    const data: Post = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function createPost(post: Post) {
  //add a data validation check (either here or in the function )
  try {
    const response = await fetch(`${url}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    const data: CreatedPost = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function deletePost(id: string) {
  try {
    await fetch(`${url}/posts/${id}`, {
      method: 'DELETE',
    });
    console.log('Post deleted successfully');
  } catch (e) {
    console.log(e);
  }
}

export async function updatePost(id: string, post: UpdatePost) {
  try {
    const response = await fetch(`${url}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    const data: CreatedPost = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

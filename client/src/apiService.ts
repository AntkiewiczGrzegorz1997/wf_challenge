import { Post, CreatedPost, UpdatePost } from './types/posts';

const url: string = 'http://localhost:3000/api/v1';

export async function getPosts() {
  try {
    const response = await fetch(`${url}/posts`);
    const data: CreatedPost[] = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

// Due to time constraints This method is not utilized (for example in a dedicated Post component) since all of the details are already present in getPosts and displayed on the page.
export async function getPost(id: string) {
  try {
    const response = await fetch(`${url}/posts/${id}`);
    const data: CreatedPost = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function createPost(post: Post) {
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

export async function updatePost(id: number, post: UpdatePost) {
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

import { Post } from './types/types';

const url: string = 'http://localhost:3000';

export async function getPosts() {
  try {
    const response = await fetch(`${url}/posts`);
    const data: Post[] = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

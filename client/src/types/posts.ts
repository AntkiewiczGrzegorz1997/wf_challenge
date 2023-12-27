export type Post = {
  title: string;
  content: string;
  lat?: string;
  long?: string;
  image_url?: string;
};

export type CreatedPost = Post & {
  id: number;
  lat: string | null;
  long: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type UpdatePost = Partial<Post>;

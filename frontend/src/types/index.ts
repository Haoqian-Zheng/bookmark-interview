export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Bookmark {
  id: number;
  url: string;
  title: string;
  description: string;
  tags: Tag[];
  owner: string;
  created_at: string;
  updated_at: string;
}

export interface BookmarkCreate {
  url: string;
  title: string;
  description?: string;
  tag_names?: string[];
}

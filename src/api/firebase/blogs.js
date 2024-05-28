/*
 *  blogs table
 *    id
 *    title
 *    cover
 *    author: {uid, displayName, avatarUrl}
 *    share
 *    favorite
 *    view
 *    comment
 *    createdAt
 */
import { database } from './config'
import { ref, get, set, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';

export async function getBlogList() {
  return get(ref(database, 'blogs'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);
        records = records.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); 
        return records;
      }
      return null;
    }); 
}

export async function getBlog(id) {
  return get(ref(database, `blogs/${id}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    }); 
}

export async function insertBlog(blog) {
  const id = uuid();
  const { title, author, cover } = blog;
  return set(ref(database, `blogs/${id}`), {
    id, title, author, cover, view: 0, favorite: 0, comment: 0, share: 0,
    createdAt: new Date().toISOString()
  });
}

export async function updateBlog(blog) {
  const { id } = blog;
  return set(ref(database, `blogs/${id}`), blog);
}

export async function deleteBlog(id) {
  return remove(ref(database, `blogs/${id}`));
}

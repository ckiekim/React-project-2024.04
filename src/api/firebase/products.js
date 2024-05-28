/*
 *  products table
 *    id
 *    name
 *    cover
 *    price
 *    priceSale
 *    colors: []
 *    releasedAt
 *    status
 */
import { database } from './config'
import { ref, get, set, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';

export async function getProductList() {
  return get(ref(database, 'products'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);
        records = records.sort((a, b) => b.releasedAt.localeCompare(a.releasedAt));
        return records;
      }
      return null;
    }); 
}

export async function getProduct(id) {
  return get(ref(database, `products/${id}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    }); 
}

export async function insertProduct(product) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product, id, releasedAt: new Date().toISOString()
  });
}

export async function updateProduct(product) {
  const { id, name, cover, price, priceSale, status, colors, releasedAt } = product;
  if (priceSale)
    return set(ref(database, `products/${id}`), {
      id, name, cover, price, priceSale, status, colors, releasedAt
    });
  else
    return set(ref(database, `products/${id}`), {
      id, name, cover, price, status, colors, releasedAt
    });
}

export async function deleteProduct(id) {
  return remove(ref(database, `products/${id}`));
}

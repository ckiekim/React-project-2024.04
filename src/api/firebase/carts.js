/*
 *  carts table
 *    id    # id는 uid
 *    itemCount
 *    totalPrice
 *    items: [{pname, cover, unitPrice, quantity, option, subTotal}, ]
 */
import { database } from './config'
import { ref, get, set, remove } from 'firebase/database';

export async function getCart(id) {
  return get(ref(database, `carts/${id}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    }); 
}

export async function insertCart(cart) {
  return set(ref(database, `carts/${cart.id}`), cart);
}

export async function updateCart(cart) {
  return set(ref(database, `carts/${cart.id}`), cart);
}

export async function deleteCart(id) {
  return remove(ref(database, `carts/${id}`));
}

/*
 *  orders table
 *  	oid
 *  	uid
 *  	email
 *  	status
 *  	orderedAt
 *  	totalPrice
 *  	itemCount
 *  	items: [ {id, pname, cover, unitPrice, quantity, option, subTotal}, ...]
 *  	deliveryInfo: { zoneCode, addr1, addr2, tel, memo }
 *  	wholePrice
 *  	paymentKey
 */
import { database } from './config'
import { ref, get, set, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';

export async function getOrderList(uid) {
  return get(ref(database, 'orders'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);
        records = records.sort((a, b) => b.orderedAt.localeCompare(a.orderedAt));
        if (uid)
          records = records.filter(record => record.uid === uid);
        return records;
      }
      return null;
    }); 
}

export async function getOrder(oid) {
  return get(ref(database, `orders/${oid}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    }); 
}

// oid 값을 반환하여 결제 처리시 사용
export async function insertOrder(order) {
  const oid = uuid();
  await set(ref(database, `orders/${oid}`), {
    ...order, oid, status:'주문완료', orderedAt: new Date().toISOString()
  });
  return oid;
}

export async function updateOrder(order) {
  const { oid } = order;
  return set(ref(database, `orders/${oid}`), order);
}

export async function deleteOrder(oid) {
  return remove(ref(database, `orders/${oid}`));
}

import request from '../utils/request';

export function queryShoppingCart() {
  return request('/api/shoppingcarts',{
    method:'POST'
  });
}

export function queryAddressList() {
  return request('/api/addresslist',{
    method:'POST'
  });
}

import request from '../utils/request';

export function queryShoppingCart() {
  return request('/api/shoppingcarts',{
    method:'POST'
  });
}

import {queryShoppingCart} from "../services/shoppingcart";


class ProductItem {
  constructor() {
    this.selected = false;
  }

  toggleState = () => {
    this.selected = !this.selected;
  }

  setSelect = seleted => {
    this.selected = seleted;
  }
}

class ShopItem {
  constructor(list = []) {
    this.selected = false;
    this.list = list;
  }

  toggleState = () => {
    this.selected = !this.selected;
    for (let p of this.list) {
      p.setSelect(this.selected);
    }
  }
}


// 店铺列表
// 编辑状态
// 选中店铺
// 选中商品
// 商品数量加减
// 清空购物车
// 删除商品


export default {

  namespace: 'shoppingcart',

  state: {
    shops:[]
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
    },
  },

  effects: {
    * fetch({payload}, {call, put}) {  // eslint-disable-line
      const response = yield call(queryShoppingCart,payload);
      console.log('response fetch',response)
      yield put({type: 'save',payload:response.shops});
    },
  },

  reducers: {
    save(state, action) {
      return {...state, shops:action.payload};
    },
  },

};

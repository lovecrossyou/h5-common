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


class ShoppingCart{
  constructor(list = []) {
    this.selected = false ;
    this.editing = false ;
    this.list = list ;

    //计算选中的 商品总价 和总数量
    this.totalPrice = list.reduce((totalShop,shop)=>{
      const totalPriceOfShop = shop.items.reduce((total,item)=>{
        return total + item.price*item.count ;
      },0)
      return totalShop + totalPriceOfShop ;
    },0) ;

    //计算选中的 商品总数量
    this.totalCount = list.reduce((totalShop,shop)=>{
      const totalCountOfShop = shop.items.reduce((total,item)=>{
        return total + item.count ;
      },0)
      return totalShop + totalCountOfShop ;
    },0) ;
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
    shoppingCart:new ShoppingCart()
  },

  subscriptions: {
    setup({dispatch, history}) {
    },
  },

  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(queryShoppingCart,payload);
      yield put({type: 'save',payload:response.shops});
    },
  },

  reducers: {
    save(state, action) {
      const shoppingCart = new ShoppingCart(action.payload);
      return {...state, shoppingCart};
    },
  },

};

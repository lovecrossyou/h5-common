import {queryShoppingCart} from "../services/shoppingcart";


class ProductItem {
  constructor(p) {
    this.selected = false;
    this.productName = p.productName;
    this.price = p.price;
    this.count = p.count;
  }

  toggleState = () => {
    this.selected = !this.selected;
  }

  setSelect = seleted => {
    this.selected = seleted;
  }

  setCount = count=>{
    this.count = count ;
  }
}

class ShopItem {
  constructor(shop) {
    this.selected = false;
    this.list = shop.items.map(item => new ProductItem(item));
    this.shopName = shop.shopName;
  }

  toggleState = () => {
    this.selected = !this.selected;
    for (let p of this.list) {
      p.setSelect(this.selected);
    }
  }

  getTotalPrice = () => {
    return this.list.reduce((total, p) => {
      if (p.selected === false) return total;
      return total + p.price * p.count;
    }, 0);
  }

  getTotalCount = () => {
    return this.list.reduce((total, p) => {
      if (p.selected === false) return total;
      return total + p.count;
    }, 0);
  }
}


class ShoppingCart {
  constructor(list = []) {
    this.selected = false;
    this.editing = false;

    this.list = list.map(l => {
      return new ShopItem(l);
    });

    //计算选中的 商品总价 和总数量
    this.totalPrice = list.reduce((totalShop, shop) => {
      const totalPriceOfShop = shop.items.reduce((total, item) => {
        return total + item.price * item.count;
      }, 0)
      return totalShop + totalPriceOfShop;
    }, 0);

    //计算选中的 商品总数量
    this.totalCount = list.reduce((totalShop, shop) => {
      const totalCountOfShop = shop.items.reduce((total, item) => {
        return total + item.count;
      }, 0)
      return totalShop + totalCountOfShop;
    }, 0);
  }
}


export default {

  namespace: 'shoppingcart',

  state: {
    shoppingCart: new ShoppingCart()
  },

  subscriptions: {
    setup({dispatch, history}) {
    },
  },

  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(queryShoppingCart, payload);
      yield put({type: 'save', payload: response.shops});
    },
  },

  reducers: {
    save(state, action) {
      const shoppingCart = new ShoppingCart(action.payload);
      return {...state, shoppingCart};
    },

    // 编辑状态
    toggleEdit(state, action) {
      const editing = !state.shoppingCart.editing;
      let shoppingCart = state.shoppingCart;
      shoppingCart = Object.assign(shoppingCart, {
        editing: editing
      });
      return {...state, shoppingCart};
    },


    // 选中店铺
    toggleSelect(state, action) {
      const selected = !state.shoppingCart.selected;
      let shoppingCart = state.shoppingCart;
      shoppingCart = Object.assign(shoppingCart, {
        selected: selected
      });
      const shops = state.shoppingCart.list;
      let totalPrice = 0;
      let totalCount = 0;
      shops.forEach(shop => {
        shop.selected = selected;
        //商品的选中
        const products = shop.list;
        products.forEach(p => {
          p.selected = selected;
        });
        totalPrice += shop.getTotalPrice();
        totalCount += shop.getTotalCount();
      })
      shoppingCart.totalPrice = totalPrice;
      shoppingCart.totalCount = totalCount;
      return {...state, shoppingCart};
    },

    // 选中商品
    selectProduct(state,action) {
      action.payload.toggleState();
      let shoppingCart = state.shoppingCart;
      shoppingCart = Object.assign({},shoppingCart);
      const shops = state.shoppingCart.list;
      let totalPrice = 0;
      let totalCount = 0;
      shops.forEach(shop => {
        //商品的选中
        const products = shop.list;
        totalPrice += shop.getTotalPrice();
        totalCount += shop.getTotalCount();
      })
      shoppingCart.totalPrice = totalPrice;
      shoppingCart.totalCount = totalCount;
      return {...state, shoppingCart};
    },

    // 商品数量加减
    setProductCount(state,action){
      console.log(action.payload);
      action.payload.product.setCount(action.payload.count) ;
      let shoppingCart = state.shoppingCart;
      shoppingCart = Object.assign({},shoppingCart);
      const shops = state.shoppingCart.list;
      let totalPrice = 0;
      let totalCount = 0;
      shops.forEach(shop => {
        //商品的选中
        const products = shop.list;
        totalPrice += shop.getTotalPrice();
        totalCount += shop.getTotalCount();
      })
      shoppingCart.totalPrice = totalPrice;
      shoppingCart.totalCount = totalCount;
      return {...state, shoppingCart};
    }
    // 清空购物车
    // 删除商品

  },

};

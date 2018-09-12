import {queryAddressList} from "../services/shoppingcart";

export default {
  namespace: 'address',
  state: {
    addressList:[],
    active:null
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // history.listen((location) => {
      //   console.log('location is: %o', location);
      //   console.log('重定向接收参数：%o', location.state)
      //   // 调用 effects 属性中的 query 方法，并将 location.state 作为参数传递
      //   dispatch({
      //     type: 'saveActive',
      //     payload: location.state,
      //   })
      // });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const addressList = yield call(queryAddressList,payload) ;
      yield put({ type: 'save',payload:addressList });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, addressList:action.payload };
    },

    saveActive(state,action){
      const currentState = Object.assign(state,{
        active:action.payload
      });
      console.log('currentState ',currentState);
      return currentState ;
    }
  },

};

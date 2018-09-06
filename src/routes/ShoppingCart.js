import React from 'react';
import {connect} from 'dva';
import {NavBar, Icon, Checkbox, Button,Stepper} from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;
const logo = 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1536043540&di=372395e9e3a3bb666e0648ee4e82eb77&src=http://img3.99114.com/group1/M00/E4/FC/wKgGS1kdNRWAJtHRAAEkC21g9l8197.png'

// 店铺头部
const ShopHeader = ({shop}) => {
  return <div style={{
    height: '80px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '15px',
    borderTopRightRadius:'8px',
    borderTopLeftRadius:'8px'

  }}>
    <div>
      <CheckboxItem onChange={e => console.log('checkbox', e)}>
        <a onClick={(e) => {

        }}>{shop.shopName}</a>
      </CheckboxItem>
    </div>
    <div>领券</div>
  </div>
}
// 单个商品
const PriductItem = ({product}) => {
  return <div
    style={{backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', paddingRight: '15px'}}>
    <div style={{width:'40px'}}>
      <CheckboxItem onChange={e => console.log('checkbox', e)}/>
    </div>
    <div style={{flex:1}}>
      <img style={{width: '120px', height: '120px'}} src={logo} alt=""/>
    </div>
    <div style={{
      display: 'flex',
      flex:5,
      flexDirection: 'column',
      alignItems: 'flex-start',
      height: '120px',
      justifyContent: 'space-around',
      marginLeft: '15px',
    }}>
      <div>IQS pencil 主动式电容笔高精度超细头触控屏幕苹果ipad平板手机安卓手写笔绘画</div>
      <div style={{color: '#999999'}}> 顺丰包邮</div>
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
        <div style={{color: 'pink'}}>¥{product.price}</div>
        <Stepper
          showNumber
          min={1}
          defaultValue={product.count}
        />
      </div>
    </div>
  </div>
}
// 店铺
const ShopItem = ({shop}) => {
  return <div style={{margin:'8px',borderRadius:'8px'}}>
    <ShopHeader shop={shop}/>
    {
      shop.items.map((p,index)=><PriductItem key={'#'+index} product={p}/>)
    }
  </div>
}
// 购物车footer
const ShopppingCartFooter = ()=>{
  return <div style={{position:'fixed',bottom:0,height:'50px',backgroundColor:'#fff',left:0,right:0}}>
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:'10px',paddingRight:'15px'}}>
      <div style={{display:'flex',flexDirection:'row',alignItems:'center' }}>
        <CheckboxItem onChange={e => console.log('checkbox', e)}>全选</CheckboxItem>
      </div>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <div>合计：</div>
        <div style={{color:'red',paddingRight:'8px'}}>¥178</div>
        <Button type="primary"  inline>结算(0)</Button>
      </div>
    </div>
  </div>
}

class ShoppingCart extends React.Component {

  UNSAFE_componentWillMount(){
    this.props.dispatch({
      type:'shoppingcart/fetch',
      payload:{}
    })
  }


  render() {
    const shoppingCart = this.props.store.shoppingCart ;

    console.log(shoppingCart);
    return (
      <div style={{paddingBottom:'50px',paddingTop:'50px'}}>
        <div style={{position:'fixed',top:0,left:0,right:0,zIndex:999}}>
          <NavBar
            mode="dark"
            onLeftClick={() => console.log('onLeftClick')}
            rightContent={[
              <Icon key="1" type="ellipsis"/>,
            ]}
          >购物车</NavBar>
        </div>
        {shoppingCart.list.map((shop,index)=><ShopItem shop={shop} key={'#'+index}/>)}
        <ShopppingCartFooter/>
      </div>
    );
  }
}

export default connect(({shoppingcart})=>({
store:shoppingcart
}))(ShoppingCart);

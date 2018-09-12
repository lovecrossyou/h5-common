import React from 'react';
import {connect} from 'dva';
import {Button} from 'antd-mobile';
import styles from './Address.css'
import {AddressCell} from "../../components/AddressCell";
import {routerRedux } from 'dva/router';


const CreateNewAddress = () => {
  return (
    <div style={{marginTop: '94px'}}>
      <Button className={styles["btn-new"]} type='warning'>添加新地址</Button>
    </div>
  )
}

class AddressList extends React.Component {


  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'address/fetch',
      payload: {}
    });
  }

  // 编辑
  addresseEdit = (address)=>{
    this.props.dispatch({
      type:'address/saveActive',
      payload:address
    });
    this.props.dispatch(
      routerRedux.push('addressedit')
    );
  }

  // 删除
  addressDel = ()=>{

  };


  render() {
    const store = this.props.store;
    return <div>
      {
        store.addressList.length === 0 ? (<CreateNewAddress/>) : (store.addressList.map((address,index) => {
          return <AddressCell
            edit={this.addresseEdit}
            del={this.addressDel}
            address={address}
            key={'#'+index}/>
        }))
      }
    </div>
  }
}


export default connect(({address})=>({
  store:address,
}))(AddressList);

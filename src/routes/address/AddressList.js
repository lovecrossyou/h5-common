import React from 'react';
import {connect} from 'dva';
import {Button, ActivityIndicator} from 'antd-mobile';
import styles from './Address.css'
import {AddressCell} from "../../components/AddressCell";
import {routerRedux} from 'dva/router';


const CreateNewAddress = ({onClick}) => {
  return (
    <div className={styles["add-addr-container"]}>
      <Button className={styles["btn-new"]} type='warning' onClick={onClick}>添加新地址</Button>
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
  addressEdit = (address) => {
    this.props.dispatch({
      type: 'address/saveActive',
      payload: address
    });
    this.props.dispatch(
      routerRedux.push('addressedit')
    );
  }

  // 删除
  addressDel = (address) => {
    console.log('删除 ', address);
  };

  // 新建
  createNew = () => {
    this.props.dispatch({
      type: 'address/saveActive',
      payload: null
    });
    this.props.dispatch(
      routerRedux.push('addressedit')
    );
  }


  render() {
    const store = this.props.store;
    const {loading} = this.props;

    return <div style={{paddingBottom: '60px'}}>
      {
        store.addressList.map((address, index) => {
          return <AddressCell
            edit={this.addressEdit}
            del={this.addressDel}
            address={address}
            key={'#' + index}/>
        })
      }
      <CreateNewAddress onClick={this.createNew}/>
      <div className={styles.loading}>
        <ActivityIndicator toast text="正在加载" animating={loading}/>
      </div>
    </div>
  }
}


export default connect((state) => ({
  store: state.address,
  loading: state.loading.global
}))(AddressList);

import React from 'react';
import {connect} from 'dva';
import styles from './PointShop.css'
import {routerRedux } from 'dva/router';

// 积分商城


const UserInfo = () => {
  return <div style={{
    height: '82px',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '34px'
  }}>
    <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
      <img style={{width: '52px', height: '52px', border: 'solid 1px #e1e1e1', borderRadius: '50%'}} width='52px' height='52px' src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536582124408&di=e0db4bbb1854efa7904e07f78b8c4f8d&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fca1349540923dd54ee0b724adb09b3de9c82489c.jpg" alt=""/>
      <div style={{paddingLeft: '13px'}}>
        <div style={{color: '#040404', fontSize: '15px', lineHeight: '34px'}}>张小三</div>
        <div style={{color: '#AEAAAA', fontSize: '12px', lineHeight: '34px'}}>普通会员</div>
      </div>
    </div>
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div>122</div>
      <div style={{color: '#040404'}}>积分</div>
    </div>
  </div>
}

const Banner = () => {
  return <div className={styles.banner}>

  </div>
}


const Category = ({onClick}) => {

  const Item = ({title, className}) => {
    return <div
      onClick={onClick}
      style={{backgroundColor: '#fff', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <div className={className}/>
      <div style={{textAlign: 'center', height: '24px', lineHeight: '24px'}}>{title}</div>
    </div>
  }

  return <div style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '17px',
    marginBottom: '12px',
    backgroundColor: '#fff',
    padding: '15px'
  }}>
    <Item title='吃行乐' className={styles.eat}/>
    <Item title='车生活' className={styles.car}/>
    <Item title='小日常' className={styles.normal}/>
    <Item title='其他' className={styles.other}/>

  </div>
}


const CenterView = ()=>{
  return <div style={{display:'flex',justifyContent:'space-between',backgroundColor:'#f5f5f5',marginBottom:'15px'}}>
    <div className={styles.left}></div>
    <div className={styles.right}></div>
  </div>
}


// Hot
const Hot = () => {

  const Item = ({title, desc}) => {
    return <div style={{backgroundColor: '#fff', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <div style={{
        width: '62px',
        height: '62px',
        border: 'solid 1px #e2e2e2',
        backgroundColor: '#e2e2e2',
        borderRadius: '16px'
      }}/>
      <div>
        <div className={styles.title} style={{textAlign: 'center',color:'#D60B0B',fontSize:'15px'}}>{title}</div>
        <div style={{textAlign: 'center', height: '24px', lineHeight: '24px'}}>{desc}</div>
      </div>
    </div>
  }


  return <div style={{backgroundColor: '#fff', marginBottom: '15px'}}>
    <div className={styles.flexR}  style={{height:'10px',padding:'15px',backgroundColor:'#fff'}}>
      <div>热门兑换</div>
      <div>更多</div>
    </div>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: '17px',
      backgroundColor: '#fff',
      padding: '15px'
    }}>
      <Item title='10M币' desc='玻璃清洁剂泡腾片'/>
      <Item title='60M币' desc='玻璃清洁剂泡腾片'/>
      <Item title='70M币' desc='玻璃清洁剂泡腾片'/>
    </div>
  </div>
}

// Local
const Local = () => {
  return <div style={{height: '255px', backgroundColor: '#fff', marginBottom: '12px'}}>
    <div className={styles.flexR} style={{height:'10px',padding:'15px',backgroundColor:'#fff'}}>
      <div>本地特惠</div>
    </div>
    <div className={styles.flexR}>
        <div className={styles.localLeft}></div>
      <div className={styles.flexC}>
        <div className={styles.rightTop}></div>
        <div className={styles.rightBot}></div>
      </div>
    </div>
  </div>
}

class Points extends React.Component {

  goProductList = ()=>{
    this.props.dispatch(routerRedux.push('/products'))
  }


  render() {
    return <div style={{backgroundColor: '#f5f5f5'}}>
      <UserInfo/>
      <Banner/>
      <Category onClick={this.goProductList}/>
      <CenterView/>
      <Hot/>
      <Local/>
    </div>
  }
}

export default connect(({shoppingcart}) => ({
  store: shoppingcart
}))(Points);

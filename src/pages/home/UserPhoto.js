import React from 'react'
import axios from "axios/index"

class UserPhoto extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount(){
    let url = 'http://123.56.14.124:918/compare/?format=json&target=profile&id=423,910,788'

    axios.get(url)
    .then(res => {
      this.setState({data: res.data.data.data})
    }).catch(err =>{
      console.log(err)
    })
  }

  renderSex(data) {
    let arr = []

    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      let m_M = (item.maoyan_M * 100).toFixed(1) + '%'
      let m_F = (item.maoyan_F * 100).toFixed(1) + '%'
      let t_M = (item.tpp_M * 100).toFixed(1) + '%'
      let t_F = (item.tpp_F * 100).toFixed(1) + '%'

      arr.push(
      <div>
      <div className="user-sex_div">
        <div className="user-sex_title">{item.title}</div>
        <div style={{width: '15%', display: 'inline-block', textAlign: 'center'}}><span>猫眼</span></div>
        <div style={{width: '75%', display: 'inline-block'}}><span className="sex-my-male" style={{width: m_M}}><span className="m_tip">男 {m_M}</span></span>
        <span className="sex-my-female" style={{width: m_F}}><span className="f_tip">女 {m_F}</span></span></div>
      </div>
      <div className="user-sex_div">
      <div style={{width: '15%', display: 'inline-block', textAlign: 'center'}}><span>淘票票</span></div>
        <div style={{width: '75%', display: 'inline-block'}}><span className="sex-my-male" style={{width: t_M}}>
        {/* <span className="m_tip">男 {t_M}</span> */}
        </span>
        <span className="sex-my-female" style={{width: t_F}}>
        {/* <span className="f_tip">女 {t_F}</span> */}
        </span></div>
      </div></div>)
    }

    return (<div className="user-sex">
    <p style={{fontSize: '14px',marginTop: '24px', marginBottom: '36px'}}>受众性别分布</p>
    {arr}
    </div>)
  }

  renderAge(data) {
    let myAge = []
    let tppAge = []
    // const data2 = [{
    //   name: '20岁以下', my: dl.maoyan_0_19 * 100, tpp: dl.tpp_0_19 * 100
    // },{
    //   name: '20-24', my: dl.maoyan_20_24 * 100, tpp: dl.tpp_20_24 * 100
    // },{
    //   name: '25-29', my: dl.maoyan_25_29 * 100, tpp: dl.tpp_25_29* 100
    // },{
    //   name: '30-34', my: dl.maoyan_30_34 * 100, tpp: dl.tpp_30_34* 100
    // },{
    //   name: '35-39', my: dl.maoyan_35_39 * 100, tpp: dl.tpp_35_39* 100
    // },{
    //   name: '40岁以上', my: dl.maoyan_40_100 * 100, tpp: dl.tpp_40_100* 100
    // }]
    let ages = [{name: '20岁以下', index: 'maoyan_0_19'}, {name: '20-24', index: 'maoyan_20_24'}, {name: '25-29', index: 'maoyan_25_29'}, {name: '30-34', index: 'maoyan_30_34'} , {name: '35-39', index: 'maoyan_35_39'}, {name: '40岁以上', index: 'maoyan_40_100'}]

    let arr = []
    for (let i = 0; i < ages.length; i++) {
      (function(i){
        let name = ages[i].name
        let index = ages[i].index
        for (let j = 0; j < data.length; j++) {
          let item = data[j]
          let title = item.title
          // debugger
          if (arr.length === 0) {
            let obj = {}
            obj.name = name
            obj[`${title}`] = item[index]
            arr.push(obj)
            // arr[i] = obj
            // break;
          }
          
          for (let val of arr) {
            if(val.name === name) {
               val[`${title}`] = item[index]
               break;
            }
          }


          // arr.every(val => {
          //   // debugger
          //   if(val.name === name) {
          //      val[`${title}`] = item[index]
          //      return false
          //   } else {
          //     let obj = {}
          //     obj.name = name
          //     obj[`${title}`] = item[index]

          //     arr.push(obj)
          //     return false
          //   }
          // })
        }
      })(i)
    }
    debugger
    return arr
  }

  render(){
    let { data } = this.state
    if (data.length === 0) return (<div></div>)
    return ( 
      <div>
        {this.renderSex(data)}
        <div className="split-line"></div>
        {this.renderAge(data)}
        {/*  */}
      </div>
    )
  }
}

export default UserPhoto



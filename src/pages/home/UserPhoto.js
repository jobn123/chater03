import React from 'react'
import axios from "axios/index"
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

class UserPhoto extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      ageIndex: 0,
      color: ['#FF574D', '#3F8EF2', '#2BC7FF', '#F5A623', '#F8E71C', '#7ED321', '#417505', '#BD10E0']
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
    let { ageIndex, color } = this.state
    let myAge = []
    let tppAge = []
    
    let ages = [{name: '20岁以下', index: 'maoyan_0_19'}, {name: '20-24', index: 'maoyan_20_24'}, {name: '25-29', index: 'maoyan_25_29'}, {name: '30-34', index: 'maoyan_30_34'} , {name: '35-39', index: 'maoyan_35_39'}, {name: '40岁以上', index: 'maoyan_40_100'}]

    let arr = []
    let titleArr = []

    for (let i = 0; i < ages.length; i++) {
      (function(i){
        let name = ages[i].name
        let index = ageIndex === 0 ? ages[i].index : ages[i].index.replace('maoyan', 'tpp')
        for (let j = 0; j < data.length; j++) {

          (function(j){
            let item = data[j]
            let title = item.title

            for (let val of arr) {
              if(val.name === name) {
                val[`${title}`] = item[index] * 100
                return
              }
            }
            let obj = {}
            obj.name = name
            obj[`${title}`] = item[index] * 100
            arr.push(obj)
          })(j)
        }
      })(i)
    }

    // bar 
    for (let k = 0; k < data.length; k++) {
      let t = data[k].title
      let c = color[k]
      titleArr.push(<Bar dataKey={t} fill={c} />)
    }

    return (
      <div>
        <p style={{fontSize: '14px',marginTop: '24px', marginBottom: '36px', marginLeft: '15px', color: '#108EE9'}}>受众年龄分布</p>
        <div className="agetitle"><span className={ageIndex === 0 ? 'ageActive' : ''} onClick={()=>{this.setState({ageIndex: 0})}}>猫眼</span><span className={ageIndex === 1 ? 'ageActive' : ''} onClick={()=>{this.setState({ageIndex: 1})}}>淘票票</span></div>
        <BarChart width={600} height={300} data={arr}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"/>
        <YAxis />
        <Tooltip />
        <Legend />
        {titleArr}
        </BarChart>
      </div>
    )
  }

  renderArea(data) {
    let { color } = this.state

    let areas = [{name: '一线城市', index: 'tpp_city1'},{name: '二线城市', index: 'tpp_city2'},{name: '三线城市', index: 'tpp_city3'},{name: '四线城市', index: 'tpp_city4'}]

    let arr = []
    for (let i = 0; i < areas.length; i++) {
      (function(i){
        let name = areas[i].name
        let index = areas[i].index
        for (let j = 0; j < data.length; j++) {

          (function(j){
            let item = data[j]
            let title = item.title
            
            for (let val of arr) {
              if(val.name === name) {
                val[`${title}`] = item[index] * 100
                return
              }
            }
            let obj = {}
            obj.name = name
            obj[`${title}`] = item[index] * 100
            arr.push(obj)
          })(j)
        }
      })(i)
    }

    // bar 
    let titleArr = []
    for (let k = 0; k < data.length; k++) {
      let t = data[k].title
      let c = color[k]
      titleArr.push(<Bar dataKey={t} fill={c} />)
    }

    return (
      <div>
        <p style={{fontSize: '14px',marginTop: '24px', marginBottom: '36px', marginLeft: '15px', color: '#108EE9'}}>淘票票地域分布</p>
        
        <BarChart width={600} height={300} data={arr}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Legend />
        {titleArr}
        </BarChart>
      </div>
    )
  }

  render(){
    let { data } = this.state
    if (data.length === 0) return (<div></div>)
    return ( 
      <div>
        {this.renderSex(data)}
        <div className="split-line"></div>
        {this.renderAge(data)}
        <div className="split-line"></div>
        {this.renderArea(data)}
        {/*  */}
      </div>
    )
  }
}

export default UserPhoto



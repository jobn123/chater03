import React from 'react'
// import { InputItem } from 'antd-mobile'
// import axios from "axios/index"
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import './event.css'

const data = [
  {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
]

class Event extends React.Component{
  constructor() {
    super()
  }
  componentWillMount() {
    let u = localStorage.getItem('user')
    if (u != null) {
      this.setState({
        isLogin: true
      })
    }
  }

  backHome() {
    let u = JSON.parse(localStorage.getItem('user'))
    this.props.history.push(`/home/${u.id}`)
  }

  renderEventLists() {
    let cw = document.body.clientWidth
    return (
      <LineChart width={cw} height={220} data={data} data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <XAxis dataKey="name"/>
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      {/* <Legend /> */}
      <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      {/* <Line type="monotone" dataKey="amt" stroke="#82cc9d" /> */}
      </LineChart>
    )
  }
  
  render(){
    return (
      <div>
        <div className="comparedetail-header">
          <span className="detail-back" onClick={()=>{this.backHome()}}>返回</span>
          <span>猫眼想看事件</span>
        </div>
        {this.renderEventLists()}
      </div>
    )
  }
}

export default Event
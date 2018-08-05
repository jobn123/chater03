import React from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import './comparedetail.css'

const data = [
  {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
]

class CompareDetail extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      value: "对比组列表",
      editFlag: true,
      segZero: 0,
      segIndex: 0,
      data: ['猫眼想看','淘票票先看' , '百度指数', '微博指数', '微信指数', '预售票房']
    }
  }
  backHome() {
    let u = JSON.parse(localStorage.getItem('user'))
    this.props.history.push(`/home/{u.id}`)
  }
  edit() {
    console.log('-----edit------')
    this.setState({
      editFlag: !this.state.editFlag
    })
  }
  showEdit() {
    this.setState({
      editFlag: !this.state.editFlag
    })
  }
  addMainitem() {

  }
  addGroups() {

  }
  setZeroSeg() {

  }
  onValueChange() {

  }
  up(i) {
    let { data } = this.state
    if (i === 0) return

    let val = data[i]
    let preVal = data[i-1]
    data[i-1] = val
    data[i] = preVal

    this.setState({data: data})
  }
  down(i) {
    let { data } = this.state
    if (i === data.length - 1) return

    let val = data[i]
    let nextVal = data[i+1]

    data[i] = nextVal
    data[i+1] = val
    
    this.setState({data: data})
  }
  add(i) {
    console.log('----------add-----------')
  }
  back() {
    console.log('---back-')
    this.setState({editFlag: false})
  }
  save() {
    console.log('save')
    this.setState({editFlag: false})
  }
  renderEditTrendItem() {
    let arr = this.state.data
    let trendArr = []
    for (let i = 0; i < arr.length; i++) {
      let title = arr[i]
      let upClassName = i === 0 ? 'trend_item_up' : 'trend_item_canup'
      let downClassName = i === arr.length - 1 ? 'trend_item_cndown' : 'trend_item_down'
      let item =  (
        <div className="edit-trend_item">
          <span>{ title }</span>
          <div style={{float: 'right'}}>
          <span className={upClassName} onClick={()=>{this.up(i)}}></span>
          <span className={downClassName} onClick={()=>{this.down(i)}}></span>
          <span className="trend_item_add" onClick={()=>{this.add(i)}}></span></div>
        </div>
      )

      trendArr.push(item)
    }

    return trendArr
  }
  render(){
    let { editFlag, segZero, segIndex } = this.state
    if (editFlag) {
      return (
        <div>
          <div className="comparedetail-header">
            <span className="detail-back" onClick={()=>{this.back()}}>返回</span>
            <span className="">编辑总趋势观测指标</span>
            <span className="detail-save" onClick={()=>{this.save()}}>保存</span>
          </div>

          {/*  body  */}
          <div className="edit-trend_body">
            {this.renderEditTrendItem()}
          </div>
        </div>
      )
    }
    return (
      <div className="comparedetail">
        <div className="comparedetail-header">
          <span className="detail-back" ononClick={()=>{this.showEdit()}}>返回</span>
          <span className="detail-trend">总趋势</span>
          <span className="detail-compare">对比详情</span>
          <span className="detail-edit" onClick={()=>{this.showEdit()}}></span>
        </div>
        
        <div className="com-sub_header">
          <div style={{display: 'inline-block', width:'40%'}}>
            <span className={segIndex == 0 ? 'segSpanActive' : 'segSpan'} onClick={()=>{this.onValueChange(0)}}> 绝对时间 </span>
            <span className={segIndex == 1 ? 'segSpanActive' : 'segSpan'} onClick={()=>{this.onValueChange(1)}}> 相对时间 </span>
          </div>
          <div style={{display: 'inline-block', width:'40%', marginLeft: '18%'}}>
            <span className={segZero == 0 ? 'segSpanActive' : 'segSpan'} onClick={()=>{this.setZeroSeg(0)}}> 累计 </span>
            <span className={segZero == 1 ? 'segSpanActive' : 'segSpan'} onClick={()=>{this.setZeroSeg(1)}}> 新增 </span>
          </div>

          <div className="compare-date">2018-12-12/2018-12-12</div>

          <LineChart width={321} height={161} data={data} data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          <Line type="monotone" dataKey="amt" stroke="#82cc9d" />
          </LineChart>
        </div>
      </div>
    )
  }
}

export default CompareDetail
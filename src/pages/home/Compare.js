import React from 'react'
import { Calendar, Range, Button } from 'antd-mobile'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

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

class Compare extends React.Component{
  constructor(props) {
    super(props)
    let e = new Date()
    let s = new Date(e.getTime() - 2592000000)
    let start = this.fomartDate(s);
    let end = this.fomartDate(e)
    let dateStr = start + '/' + end

    this.state = {
      value: "对比组列表",
      editFlag: false,
      showCalender: false,
      showRange: false,
      segZero: 0,
      segIndex: 0,
      data: ['猫眼想看','淘票票先看' , '百度指数', '微博指数', '微信指数', '预售票房'],
      showDate: [30, 0],
      dateStr: dateStr,
      start: start,
      end: end,
      start2: '-30',
      end2: '0'
    }
  }
  fomartDate = (str) => {
    var d = new Date(str);
    var ts = d.getTime() - d.getTimezoneOffset()*60*1000;
    var s = new Date(ts).toISOString()

    return s.replace(/T.+$/, '');
  }
  backHome() {
    let u = JSON.parse(localStorage.getItem('user'))
    this.props.history.push(`/comparedetail/${u.id}`)
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
  onValueChange(e) {
    console.log(e)
    // const d = ['绝对时间', '相对时间']
    const index = e
    let flag = index === 1 ? true : false
    // debugger
    let {segIndex, start, end, segZero, start2, end2} = this.state
    // let pids = ""
    // this.props.pidlist.map((pid)=>{
    //   pids += "&pid="
    //   pids += pid
    // })
    // console.log(this.props.platform)
    // let platform = segZero == 0 ? this.props.platform : this.props.platform.replace('count', 'up')
    
    this.setState({
      showRange: flag,
      segIndex: index
    }, ()=> {
      // let url = ''
      // if(this.state.segIndex === 1) {
      //     url = `http://123.56.14.124:918/trend/?format=json${pids}&start_days=${start2}&end_days=${end2}&target=${platform}`
      //   } else {
      //     url = `http://123.56.14.124:918/trend/?format=json${pids}&start=${start}&end=${end}&target=${platform}`
      // }
      // this.fetchTrend(url)
    })
  }
  setZeroSeg(e) {
    let {segIndex, start, end, segZero, start2, end2} = this.state
    // let pids = ""
    // this.props.pidlist.map((pid)=>{
    //   pids += "&pid="
    //   pids += pid
    // })
    this.setState({
      segZero: e,
    }, ()=> {
      // let platform = this.state.segZero == 0 ? this.props.platform : this.props.platform.replace('count', 'up')
      // let url = ''
      // if(segIndex === 1) {
      //     url = `http://123.56.14.124:918/trend/?format=json${pids}&start_days=${start2}&end_days=${end2}&target=${platform}`
      //   } else {
      //     url = `http://123.56.14.124:918/trend/?format=json${pids}&start=${start}&end=${end}&target=${platform}`
      // }
      // this.fetchTrend(url)
    })
  }
  showCanlender() {
    this.setState({
      showCalender: !this.state.showCalender
    })
  }
  onChange = (e) => {
    console.log(e)
  }
  onCancel = (e) => {
    console.log(e)
    this.setState({
      showCalender: false
    })
  }
  onConfirm = (a, b) => {
    this.setState({
      showCalender: false
    })
  }
  renderDateDiv() {
    if(this.state.segIndex === 0) {
      return (
        <div style={{marginTop: 20, textAlign: 'right'}}>
        <Button 
          size="small"
          onClick={() => this.setState({showCalendar: !this.state.showCalendar})}
          type="primary" inline style={{ marginRight: '4px' }}>
          {this.state.dateStr}
        </Button></div>
      )
    }
  }
  renderRange = () => {
    let {showRange, showDate} = this.state

    if (showRange) {
     return( 
      <div style={{marginTop: 20}}>
      <Range
          style={{ marginLeft: 30, marginRight: 30 }}
          min={-30}
          max={30}
          defaultValue={[-30, 0]}
          onChange={this.rangeChange}
          onAfterChange={this.afteRangeChange}
     /> 
     <div style={{paddingTop: 25, textAlign: 'center'}}> <span>映前</span> <span style={{color: 'red'}}>{Math.abs(showDate[0])}</span> 天
          <span style={{display: 'inline-block', marginLeft: 20}}>映后</span> <span style={{color: 'red'}}>{showDate[1]}</span>天
          </div>
     </div>)
    }
  }
  renderCalender() {  
    const MDate = new Date(new Date() - 2592000000)
    const MinDate = new Date('2014-01-01')

    if (this.state.showCalender) {
      return (
        <Calendar
            showShortcut={true}
            title="相对时间"
            visible={true}
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
            onSelectHasDisableDate={this.onSelectHasDisableDate}
            getDateExtra={this.getDateExtra}
            defaultDate={MDate}
            // minDate={new Date(+now - 5184000000)}
            minDate={MinDate}
            // maxDate={new Date(+now + 2592000000)}
            maxDate={new Date()}
          />
      )
    }
  }
  render(){
    let cw = document.body.clientWidth
    let { editFlag, segZero, segIndex } = this.state
    return (
      <div className="comparedetail">
        <div className="compare2-header">
          <span className="detail-back" onClick={()=>{this.backHome()}}>返回</span>
          <span className="detail2-trend" onClick={()=>{this.backHome()}}>总趋势</span>
          <span className="detail2-compare">对比详情</span>
          <ul className="comparesubtitle">
            <li>想看</li>
            <li>热度</li>
            <li>画像</li>
            <li>物料</li>
            <li>预售</li>
            <li>口碑</li>
          </ul>
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

          {/* <div className="compare-date" onClick={()=>{this.showCanlender()}}>2018-12-12/2018-12-12</div> */}
          {this.renderDateDiv()}
          {this.renderCalender()}
          {this.renderRange()}

          <LineChart width={cw} height={220} data={data} data={data}
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

export default Compare
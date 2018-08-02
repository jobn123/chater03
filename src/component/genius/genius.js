import React from "react";
import axios from 'axios'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
// import UserCard from '../usercard/usercard'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import ReactEcharts from 'echarts-for-react';

// Import React Table
// import _ from "lodash";
import ReactTable from "react-table";
import "react-table/react-table.css";
// import { makeData, Logo, Tips } from "../../Utils";

import { SegmentedControl, Calendar, Range, Button } from 'antd-mobile';
// import { StickyContainer, Sticky } from 'react-sticky';
// import { ListView } from 'antd-mobile';
import './index.css'
// import enUS from 'antd-mobile/lib/calendar/locale/en_US';
// import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';

const extra = {
  '2017/07/15': { info: 'Disable', disable: true },
};

const now = new Date();
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)] = { info: 'Disable', disable: true };

@connect(
  state=>state.chatuser,
  {getUserList}
)
class Genius extends React.Component {

  constructor() {
    super();
    let e = new Date()
    let s = new Date(e.getTime() - 2592000000)
    let start = this.fomartDate(s);
    let end = this.fomartDate(e)
    let dateStr = start + '/' + end
    this.state = {
      data: [],
      pages: null,
      loading: true,
      en: false,
      show: false,
      date: now,
      date_format: this._dateFormat(now),
      config: {},
      is_hot:true,
      showCalendar: false,
      showRange: false,
      segZero: 0,
      segIndex: 2,
      showDate: [30, 0],
      dateStr: dateStr,
      start: start,
      end: end,
      start2: '-30',
      end2: '0'
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps")
    console.log(nextProps)
    // if(nextProps.pidlist && nextProps.pidlist.length) {
      let s = new Date()
      this.setState({
        loading: true, 
        segIndex: 0, 
        segZero: 0,
        showRange:false, 
        // dateStr: dateStr,
        showCalendar:false, 
        // start: start,
        // end: end,
        data:[]});
      let target = "&target=" + nextProps.platform;
      let pids = "";
      nextProps.pidlist.map((pid) => {
        // console.log(pid);
        pids += "&pid=";
        pids += pid;
      });

      if (pids) {
        const url = 'http://123.56.14.124:918/trend/?format=json' + target + pids + '&start=' + this.state.start + '&end=' + this.state.end
        this.fetchTrend(url)
      }
    // }
  }

  componentDidMount(){
    // this.props.getUserList('genius')
    console.log("componentDidMount")
    console.log(this.props.pidlist)
  }

  _dateFormat(date) {
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate();
    return Y+M+D;
  }

  fetchData(state, instance) {
    console.log(this.props.userlist)
    console.log("fetchData")
    this.setState({ loading: true });
    let target= "&target="+this.props.platform;
    if(state.sorted[0] && state.sorted[0]['id']) {
      let obj = [...this.state.data];
      let item_id = state.sorted[0]['id']
      if(state.sorted[0]['desc']) {
        obj.sort((a, b) => a[item_id] >= b[item_id]?1:-1);
      }else{
        obj.sort((a, b) => a[item_id] < b[item_id]?1:-1);
      }
      return this.setState({data: obj, loading: false});
    }

    let pids = ""
    this.props.pidlist.map((pid)=>{
      // console.log(pid)
      pids += "&pid="
      pids += pid
    })
    if (pids) {
      const url = 'http://123.56.14.124:918/trend/?format=json' + target + pids + '&start=' + this.state.start + '&end=' + this.state.end
        this.fetchTrend(url)
      // const url = 'http://123.56.14.124:918/trend/?format=json&page_size=50' + target + pids
      // this.fetchTrend(url)
    }
  }
  fetchTrend = (url) => {
    axios.get(url)
    .then(res => {
      if (res.status === 200) {
        this.setState({
          data: res.data.data,
          loading: false
        });
      }
    })
  }
  _setColumns =()=>{
    const {segIndex, data} = this.state 

    if (segIndex == 1) {
      if (data.length === 0) return []
      
      let  allArr = [
        {
            Header: "片名(每日增长量)",
            accessor: "title",
            width: 180
          },
      ]
      let dArr = data[0].date.split(',')

      for(let i = 0; i < dArr.length; i++) {
        let item = parseInt(dArr[i])
        let str = item > 0 ? `映后${item}天` : `映前${Math.abs(item)}天`

        let obj = {
          Header: str,
          accessor: `${item}`,
          Cell: props => <div style={{textAlign: "right"}}>
          {props.value == null ? 0 : parseInt(props.value).toLocaleString()}
          </div>,
          // height: 30
        }
        allArr.push(obj)
      }
      return allArr
    } else {
      if (data.length === 0) return []
      let  allArr = [
        {
            Header: "片名(每日增长量)",
            accessor: "title",
            width: 180
          },
      ]
      let dArr = data[0].date.split(',')
        for(let i = 0; i < dArr.length; i++) {
          let obj = {
            Header: dArr[i],
            accessor: `${dArr[i]}`,
            Cell: props => <div style={{textAlign: "right"}}>
            {props.value == null ? 0 : parseInt(props.value).toLocaleString()}
            </div>,
            // height: 30
          }
          allArr.push(obj)
        }
      return allArr
    }
  }
  getOption = () => {
    if (this.state.data.length) {
      let obj = [...this.state.data]
      let xArr = obj[0].date.split(',')
      let XABArr = []
      if (this.state.segIndex == 1) {
        xArr.forEach(val => {
          let item = parseInt(val)
          let str = item > 0 ? `映后${item}天` : `映前${Math.abs(item)}天`
          XABArr.push(str)
        });
      }
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: obj.map(function (item) {
            return item['title']
          })
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // data: ['映前5日','映前4日','映前3日','映前2日','映前1日','上映当日']
          data: this.state.segIndex == 1 ? XABArr : xArr
        },
        yAxis: {
          type: 'value'
        },
        series: obj.map((item) => {
          if(this.props.platform === "baidu_index"||
            this.props.platform === "weibo_index"||
            this.props.platform === "weixin_index") {
            return {
              name:item['title'],
              type:'line',
              data: item.value.split(',')
            }
          } else {
            return {
              name:item['title'],
              type:'line',
              data: item.value.split(',')
            }
          }
        })
      };
    } else {
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:[]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: []
      };
    }
  };

  onChange = (e) => {
    console.log(e)
  }
  onCancel = (e) => {
    console.log(e)
    this.setState({
      showCalendar: false
    })
  }
  onConfirm = (a, b) => {
    const start = this.fomartDate(a)
    const end   = this.fomartDate(b)

    const dateS = start.substr(5,10) + '/' + end.substr(5,10)
    console.log('-----------------')
    console.log(this.props.platform)
    let pids = ""
    this.props.pidlist.map((pid)=>{
      // console.log(pid)
      pids += "&pid="
      pids += pid
    })
    if (pids) {
      let url = ''
      if(this.state.segIndex == 1) {
        const now = this.fomartDate(new Date())
        const st = this.DateDiff(start, now)
        const ed = this.DateDiff(end, now)
        url = `http://123.56.14.124:918/trend/?format=json${pids}&start_days=${st}&end_days=${ed}&target=${this.props.platform}`
        // url = 'http://123.56.14.124:918/trend/?format=json&pid=78405&pid=78429&pid=246083&start_days=-6&end_days=2&target=maoyan_wish_count'
      } else {
        url = `http://123.56.14.124:918/trend/?format=json${pids}&start=${start}&end=${end}&target=${this.props.platform}`
      }
      
      this.setState({
        showCalendar: false,
        dateStr: dateS,
        start: start,
        end: end
      }, ()=>{
       this.fetchTrend(url)
      })
    } else {
      this.setState({
        showCalendar: false,
        start: start,
        end: end
      })
    }
  }
  onValueChange = (e) => {
    console.log(e)
    // const d = ['绝对时间', '相对时间']
    const index = e
    let flag = index === 1 ? true : false
    // debugger
    let {segIndex, start, end, segZero, start2, end2} = this.state
    let pids = ""
    this.props.pidlist.map((pid)=>{
      pids += "&pid="
      pids += pid
    })
    console.log(this.props.platform)
    let platform = segZero == 0 ? this.props.platform : this.props.platform.replace('count', 'up')
    
    this.setState({
      showRange: flag,
      segIndex: index
    }, ()=> {
      let url = ''
      if(this.state.segIndex === 1) {
          url = `http://123.56.14.124:918/trend/?format=json${pids}&start_days=${start2}&end_days=${end2}&target=${platform}`
        } else {
          url = `http://123.56.14.124:918/trend/?format=json${pids}&start=${start}&end=${end}&target=${platform}`
      }
      this.fetchTrend(url)
    })
  }

  rangeChange = (a, b) => {
  }
  
  afteRangeChange = (arr) => {
    console.log(arr)
    let pids = ""
    this.props.pidlist.map((pid)=>{
      pids += "&pid="
      pids += pid
    })
    if (pids) {
      let url = `http://123.56.14.124:918/trend/?format=json${pids}&start_days=${arr[0]}&end_days=${arr[1]}&target=${this.props.platform}`

      this.setState({
        showDate: arr,
        start2: arr[0],
        end2: arr[1]
      }, () => {
        this.fetchTrend(url)
      })
    } 
  }

  fomartDate = (str) => {
    var d = new Date(str);
    var ts = d.getTime() - d.getTimezoneOffset()*60*1000;
    var s = new Date(ts).toISOString()

    return s.replace(/T.+$/, '');
  }
  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式
    var  aDate,  oDate1,  oDate2,  iDays  
    aDate  =  sDate1.split("-")  
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2002格式
    aDate  =  sDate2.split("-")  
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])  
    iDays  =  parseInt((oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
    return  iDays  
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
  renderCalender = () => {
    const MDate = new Date(new Date() - 2592000000)
    const MinDate = new Date('2014-01-01')
    if (this.state.showCalendar) {
      return (
        <div>
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
          /></div>
      )
    }
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
  setZeroSeg  = (e) => {
    // const d = ['累计', '日增']
    // const index = d.indexOf(e)
    // console.log(this.state.segIndex)
    let {segIndex, start, end, segZero, start2, end2} = this.state
    let pids = ""
    this.props.pidlist.map((pid)=>{
      pids += "&pid="
      pids += pid
    })

    this.setState({
      segZero: e,
    }, ()=> {
      let platform = this.state.segZero == 0 ? this.props.platform : this.props.platform.replace('count', 'up')
      let url = ''
      if(segIndex === 1) {
          url = `http://123.56.14.124:918/trend/?format=json${pids}&start_days=${start2}&end_days=${end2}&target=${platform}`
        } else {
          url = `http://123.56.14.124:918/trend/?format=json${pids}&start=${start}&end=${end}&target=${platform}`
      }
      this.fetchTrend(url)
    })
  } 

  render() {
    const { data, pages, loading, segIndex, segZero } = this.state;
    console.log("genius in ")
    console.log(this.props.userlist)
    console.log("aaaa ")
    console.log(this.props.datalist)
    console.log("aaa ")
    console.log(this.state)
    console.log(this.props)
    const MDate = new Date(new Date() - 2592000000)
    if (this.props.pidlist.length == 0) {
      return (
        <div style={{textAlign: 'center', marginTop: 20, fontSize: 16}}>请选择右上角加号按钮进行选择</div>
      )
    }
    return (
      <div>
        <div style={{marginBottom: 10}}>
        <div style={{display: 'inline-block', width:'40%'}}>
          <span className={segZero == 0 ? 'segSpanActive' : 'segSpan'} onClick={()=>{this.setZeroSeg(0)}}> 累计 </span>
          <span className={segZero == 1 ? 'segSpanActive' : 'segSpan'} onClick={()=>{this.setZeroSeg(1)}}> 日增 </span>
        </div>
        <div style={{display: 'inline-block', width:'40%', marginLeft: '18%'}}>
        <span className={segIndex == 0 ? 'segSpanActive' : 'segSpan'} onClick={()=>{this.onValueChange(0)}}> 绝对时间 </span>
          <span className={segIndex == 1 ? 'segSpanActive' : 'segSpan'} onClick={()=>{this.onValueChange(1)}}> 相对时间 </span>
        </div>
          {this.renderDateDiv()}
          {this.renderRange()}
          {this.renderCalender()}
        </div>

        <div style={{clear: "left"}}>
          <ReactEcharts opts={{renderer: 'svg'}} notMerge={true} lazyUpdate={true} option={this.getOption()}/>
        </div>
        <div style={{clear: "left"}}>
          {/* {this.renderTable()} */}
          <ReactTable
            resizable={false}
            pages={pages} // Display the total number of pages
            columns={this._setColumns()}
            manual // Forces table not to paginate or sort automatically, so we can handle it server-side
            data={data}
            resolveData={this.resolveData}
            loading={loading} // Display the loading overlay when we need it
            onFetchData={this.fetchData} // Request new data when things change
            // filterable
            defaultPageSize={2}
            showPagination={false}
            showPaginationTop={true}
            showPaginationBottom={false}
            showPageJump={false}
            showPageSizeOptions={false}
            style={{
              height: "200px" // This will force the table body to overflow and scroll, since there is not enough room
            }}
            className="-striped -highlight"
          />
        </div>
        <br/>
      </div>
    );
  }
}


export default Genius

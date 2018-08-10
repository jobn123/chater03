import React from 'react'
import { Calendar, Range, Button } from 'antd-mobile'
import ReactEcharts from 'echarts-for-react'
import ReactTable from "react-table"
import "react-table/react-table.css"
import axios from 'axios'

import './comparedetail.css'

const TA = [{
  title: '想看',
  subtitle:['猫眼想看','豆瓣想看', '时光网想看', '淘票票想看', '微博想看']
  },{
  title: '热度',
  subtitle:['微信指数', '百度指数', '微博指数', '微博阅读', '微博讨论']
  }, {
  title: '画像',
  subtitle:[]
  },{
  title: '物料',
  subtitle: ['总量', '优酷', '腾讯视频', '爱奇艺', '秒拍']
  }, {
  title: '预售',
  subtitle: ['每日票房', '首日拍片', '首日场次', '大盘场次']
  },{
  title: '口碑',
  subtitle: ['猫眼', '淘票票', '豆瓣', '时光网', '微博']
}]

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
      pages: null,
      editFlag: false,
      showCalender: false,
      showRange: false,
      segZero: 0,
      segIndex: 0,
      showDate: [30, 0],
      dateStr: dateStr,
      start: start,
      end: end,
      start2: '-30',
      end2: '0',
      firsTitleIndex: 0,
      secondTitleIndex: 0,
      dataLists:[],
      movies: ''
    }
  }
  componentDidMount() {
    let d = JSON.parse(localStorage.getItem('movies'))
    let {start, end} = this.state
    let arr = d.movies
    let first = d.movie_base
    arr.unshift(first)
    
    let movieStr = arr.toString()
    let url = `http://123.56.14.124:918/trend/?format=json&pid=78405&pid=78429&pid=246083&start=2015-04-20&end=2015-05-10&target=maoyan_wish_count`
    this.setState({
      movies:  movieStr
    }, ()=>{
      this.fetchData(url)
    })
  }
  fetchData(url) {
    axios.get(url).then(res =>{
      this.setState({dataLists: res.data.data, showCalender: false})
    }).catch(err =>{
      console.log('----err----')
    })
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
    // let { segZero, movies } = this.state
    // let start = this.fomartDate(a)
    // let end = this.fomartDate(b)
    
    // let type = segZero === 0 ? 'count' : 'up'

    // let url = `http://123.56.14.124:918/compare_all/?format=json&target=wish,baidu_index,weixin_index,tpp_wish,first_box&type=${type}&id=${movies}&start=${start}&end=${end}`
    // this.fetchData(url)
  }
  renderMainTitle() {
    let { firsTitleIndex } = this.state
    let arr = []
    for (let i = 0; i < TA.length; i++) {
      let cname = i === firsTitleIndex ? 'mainActive' : ''
      let item = (
        <li key={i} className={cname} onClick={()=>{this.setState({firsTitleIndex: i, secondTitleIndex: 0})}}> {TA[i].title} </li>
      )
      arr.push(item)
    }
    return arr
  }
  renderThirdTitle() {
    let { firsTitleIndex, secondTitleIndex } = this.state

    let d = TA[firsTitleIndex].subtitle
    if (d.length === 0) return

    let arr = []

    for(let i = 0; i < d.length; i++) {
      let cname = i === secondTitleIndex ? 'secondActive' : ''
      let item = (
        <li key={i} className={cname} onClick={()=>{this.setState({secondTitleIndex: i})}}>{d[i]}</li>
      )
      arr.push(item)
    }

    return (
      <ul className="compareThrtitle">{arr}</ul>
    )
  }
  getOption = (d) => {
    let xArr = d[0].date.split(',')
    return {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: d.map(function (item) {
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
        data:  xArr
      },
      yAxis: {
        type: 'value'
      },
      series: d.map((item) => {
          return {
            name:item['title'],
            type:'line',
            data: item.value.split(',')
          }
      })
    };
};
renderCharts() {
  let { dataLists, dataCls } = this.state
  if (dataLists.length === 0) return
    return (
      <div className="wish-item_box">
        <ReactEcharts opts={{renderer: 'svg'}} notMerge={true} lazyUpdate={true} option={this.getOption(dataLists)}/>
      </div>
    )
  }
  renderDateDiv() {
    if(this.state.segIndex === 0) {
      return (
        <div style={{marginTop: 20, textAlign: 'right'}}>
        <Button 
          size="small"
          onClick={() => this.setState({showCalender: !this.state.showCalender})}
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
  _setColumns =()=>{
    const {segIndex, dataLists} = this.state 
    let data = dataLists
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
            Header: "片名(累计))",
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
            <div>{props.value == null ? 0 : parseInt(props.value).toLocaleString()}</div>
            <div>22.22%</div>
            </div>,
            // height: 30
          }
          allArr.push(obj)
        }
      return allArr
    }
  }
  renderTable() {
    let { dataLists, pages } = this.state
    return (
      <ReactTable
            resizable={false}
            pages={pages} // Display the total number of pages
            columns={this._setColumns()}
            manual // Forces table not to paginate or sort automatically, so we can handle it server-side
            data={dataLists}
            resolveData={this.resolveData}
            loading={false} // Display the loading overlay when we need it
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
    )
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
            { this.renderMainTitle() }
          </ul>
        </div>
        { this.renderThirdTitle() }

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
          <div style={{clear: 'both'}}></div>

          {this.renderCharts()}
          {this.renderTable()}
        </div>
      </div>
    )
  }
}

export default Compare
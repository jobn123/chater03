import React from 'react'
import { Calendar, Range, Button } from 'antd-mobile'
// import ReactEcharts from 'echarts-for-react'
import EchartsForReact from './EchartsForReact'
import ReactTable from "react-table"
import "react-table/react-table.css"
import axios from 'axios'
import UserPhoto from './UserPhoto'

import './comparedetail.css'

const TA = [{
  title: '想看',
  subtitle:[{name:'猫眼想看', api: 'maoyan_wish'}, {name: '淘票票想看', api: 'tpp_wish'}, {name: '豆瓣想看', api: 'douban_wish'}, {name: '时光网想看', api: 'mtime_wish'}, {name: '微博想看', api: 'weibo_wish'}]
  },{
  title: '热度',
  subtitle:[{name: '微信指数', api: 'weixin_index'}, {name: '百度指数', api: 'baidu_index'} , {name: '微博指数', api: 'weibo_index'},{name: '微博阅读', api: 'weibo_view_count'}, {name: '微博讨论', api: 'weibo_discuss_count'}]
  }, {
  title: '画像',
  subtitle:[]
  },{
  title: '物料',
  subtitle: [{name: '总量', api: 'play_total'},{name: '优酷', api: 'play_youku'}, {name: '腾讯视频', api: 'play_qq'} , {name: '爱奇艺', api: 'play_iqiyi'}, {name: '秒拍', api: 'play_miaopai'} ]
  }, {
  title: '预售',
  subtitle: [{name: '每日票房', api: 'first_box'}, {name: '首日排片', api: 'first_num_percent'} , {name: '首日场次', api: 'first_num'} , {name: '零点场', api: 'zero_box'} ]
  },{
  title: '口碑',
  subtitle: [{name: '猫眼', api: 'maoyan_rating'}, {name: '淘票票', api: 'tpp_rating'},{name: '豆瓣', api: 'douban_rating'} ,{name: '时光网', api: 'mtime_rating'}, {name: '微博', api: 'weibo_rating'} ]
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
      showDate: [90, 0],
      dateStr: dateStr,
      start: start,
      end: end,
      start2: '-30',
      end2: '0',
      firsTitleIndex: 0,
      secondTitleIndex: 0,
      dataLists:[],
      movies: '',
      kbData:[]
    }
  }
  componentDidMount() {
    let d = JSON.parse(localStorage.getItem('movies'))
    let {start, end} = this.state
    let arr = d.movies
    let first = d.movie_base
    arr.unshift(first)
    
    let movieStr = arr.toString()
    let url = `http://123.56.14.124:918/compare/?format=json&target=maoyan_wish&type=count&id=${movieStr}&start=${start}&end=${end}`
    // let url = 'http://123.56.14.124:918/compare/?format=json&target=maoyan_wish&type=count&id=423,910,788&start=2018-01-08&end=2018-01-10'
    this.setState({
      movies:  movieStr
    }, ()=>{
      this.fetchData(url)
    })
  }
  fetchData(url) {
    // debugger
    let d = JSON.parse(localStorage.getItem('movies'))
    let {start, end, segZero, segIndex, start2, end2} = this.state
    let arr = d.movies
    let first = d.movie_base
    arr.unshift(first)
    let movieStr = arr.toString()

    let dateStr = segIndex === 0 ? `start=${start}&end=${end}` : `start_days=${start2}&end_days=${end2}`
    let type = segZero === 1 ? 'count' : 'up'

    let url2 = typeof url === 'object' ? `http://123.56.14.124:918/compare/?format=json&target=maoyan_wish&type=${type}&id=${movieStr}&${dateStr}` : url

    // let target = TA[firsTitleIndex].subtitle[secondTitleIndex].api
    // let type = segZero === 1 ? 'count' : 'up'
    // let dateStr = segIndex === 0 ? `start=${start}&end=${end}` : `start_days=${start2}&end_days=${end2}`

    // let url = `http://123.56.14.124:918/compare/?format=json&target=${target}&type=${type}&id=${movies}&${dateStr}`

    axios.get(url2).then(res =>{
      this.setState({dataLists: res.data.data.data, showCalender: false})
    }).catch(err =>{
      console.log('----err----')
    })
  }

  fetchKbData(url) {
    axios.get(url).then(res =>{
      this.setState({kbData: res.data.data.data, showCalender: false})
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
    const index = e
    let flag = index === 1 ? true : false
    let { segIndex, start, end, segZero, start2, end2, movies, firsTitleIndex, secondTitleIndex } = this.state

    this.setState({
      dataLists: [],      
      showRange: flag,
      segIndex: index
    }, ()=> {
      let target = TA[firsTitleIndex].subtitle[secondTitleIndex].api
      let type = segZero === 0 ? 'count' : 'up'
      let dateStr = segIndex === 1 ? `start=${start}&end=${end}` : `start_days=${start2}&end_days=${end2}`

      let url = `http://123.56.14.124:918/compare/?format=json&target=${target}&type=${type}&id=${movies}&${dateStr}`
      this.fetchData(url)
    })
  }
  setZeroSeg(e) {
    let {segIndex, start, end, segZero, start2, end2, movies, firsTitleIndex, secondTitleIndex} = this.state
    this.setState({
      segZero: e,
    }, ()=> {
      let target = TA[firsTitleIndex].subtitle[secondTitleIndex].api
      let type = segZero === 1 ? 'count' : 'up'
      let dateStr = segIndex === 0 ? `start=${start}&end=${end}` : `start_days=${start2}&end_days=${end2}`

      let url = `http://123.56.14.124:918/compare/?format=json&target=${target}&type=${type}&id=${movies}&${dateStr}`
      this.fetchData(url)
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
    let { segZero, movies } = this.state
    let start = this.fomartDate(a)
    let end = this.fomartDate(b)
    
    let type = segZero === 0 ? 'count' : 'up'

    let url = `http://123.56.14.124:918/compare/?format=json&target=maoyan_wish&type=${type}&id=${movies}&start=${start}&end=${end}`
    this.fetchData(url)
  }
  fetchMainTitle(i) {
    let {segIndex, start, end, segZero, start2, end2, movies} = this.state

    this.setState(
      {firsTitleIndex: i, secondTitleIndex: 0, segIndex: 0, segZero: 0}, ()=>{
        switch (i) {
          case 0:
          case 1:
          case 3:
            console.log('+++++++++++')
            let target = TA[i].subtitle[0].api
            let type = segZero === 0 ? 'count' : 'up'
            let url = `http://123.56.14.124:918/compare/?format=json&target=${target}&type=${type}&id=${movies}&start=${start}&end=${end}`
            this.fetchData(url)
            break;
          case 4:
            let target4 = TA[i].subtitle[0].api
            let type4 = segZero === 0 ? 'count' : 'up'
            let url4 = `http://123.56.14.124:918/compare/?format=json&target=${target4}&type=${type4}&id=${movies}&start=${start}&end=${end}`
            // let url4 = 'http://123.56.14.124:918/compare/?id=176,382,564,59,504,68,465&start_days=-6&end_days=-2&target=first_box&type=count&format=json'
            this.setState({segIndex: 1, showRange: true}, ()=>{
              this.fetchData(url4)
            })
            break;
          case 2:
            console.log('画像')
            break;
          case 5:
            console.log('口碑')
            let kt = TA[i].subtitle[0].api
            this.fetchKbData(`http://123.56.14.124:918/compare/?format=json&target=${kt}&id=${movies}`)
            break;
          default:
            break;
        } 
    })
  }
  fetSubTitleData(i) {
    let {segIndex, start, end, segZero, start2, end2, movies, firsTitleIndex} = this.state

    this.setState({secondTitleIndex: i}, ()=>{
      switch (firsTitleIndex) {
        case 0:
        case 1:
        case 3:
        case 4:
          console.log('+++++++++++')
          let target = TA[firsTitleIndex].subtitle[i].api
          let type = segZero === 0 ? 'count' : 'up'
          let dateStr = segIndex === 0 ? `start=${start}&end=${end}` : `start_days=${start2}&end_days=${end2}`

          let url = `http://123.56.14.124:918/compare/?format=json&target=${target}&type=${type}&id=${movies}&${dateStr}`
          this.fetchData(url)
          break;
        case 2:
          console.log('画像')
          break;
        case 5:
          let kbt = TA[firsTitleIndex].subtitle[i].api
          this.fetchKbData(`http://123.56.14.124:918/compare/?format=json&target=${kbt}&id=${movies}`)
          console.log('口碑')
          break;
        default:
          break;
      }
    })
  }
  renderMainTitle() {
    let { firsTitleIndex } = this.state
    let arr = []
    for (let i = 0; i < TA.length; i++) {
      let cname = i === firsTitleIndex ? 'mainActive' : ''
      let item = (
        <li key={i} className={cname} onClick={()=>{this.fetchMainTitle(i)}}> {TA[i].title} </li>
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
        <li key={i} className={cname} onClick={()=>{this.fetSubTitleData(i)}}>{d[i].name}</li>
      )
      arr.push(item)
    }

    return (
      <ul className="compareThrtitle">{arr}</ul>
    )
  }
  getOption = (d) => {
    let { segIndex, firsTitleIndex } = this.state
    let xArr = d[0].date.split(',').reverse()
    if (segIndex == 1 && firsTitleIndex !== 4) { 
      let arr = []
      for (let i = 0; i < xArr.length; i++) {
        let v = +xArr[i]
        let str = v > 0 ? `映后${v}天` : '映前' + Math.abs(v) + '天'
        arr.push(str)
      }
      xArr = arr
    }
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
rangeChange() {
  console.log('range change')
}

afteRangeChange = (arr) => {
  console.log(arr)
  let { segZero, movies, firsTitleIndex, secondTitleIndex} = this.state
  this.setState({
    showDate: arr,
    start2: arr[0],
    end2: arr[1]
  }, () => {
    let type = segZero === 0 ? 'count' : 'up'
    let target = TA[firsTitleIndex].subtitle[secondTitleIndex].api
    let url = `http://123.56.14.124:918/compare/?format=json&target=${target}&type=${type}&id=${movies}&start_days=${arr[0]}&end_days=${arr[1]}`
    this.fetchData(url)
  })
}
renderCharts() {
  let { dataLists } = this.state
  let cw = document.body.clientWidth
  if (dataLists.length === 0) return
    return (
      <div className="wish-item_box">
        {/* <ReactEcharts opts={{renderer: 'svg'}} notMerge={true} lazyUpdate={true} option={this.getOption(dataLists)}/> */}
        <EchartsForReact style={{ width: cw, height: 350 }} option={this.getOption(dataLists)}  showLoading={false} />
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
          min={-90}
          max={30}
          defaultValue={[-90, 0]}
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
  _setColumns = () => {
    const {segIndex, dataLists, firsTitleIndex} = this.state 
    let data = dataLists
    if (segIndex === 1 && firsTitleIndex !== 4) {
      if (data.length === 0) return []
      let  allArr = [
        {
          Header: "片名(每日增长量)",
          accessor: "title",
          width: 180
        },
      ]
      let dArr = data[0].date.split(',').reverse()
      for(let i = 0; i < dArr.length; i++) {
        let item = parseInt(dArr[i])
        
        let str = item > 0 ? `映后${item}天` : `映前${Math.abs(item)}天`
        let obj = {
          Header: str,
          accessor: `${item}`,
          Cell: props => <div style={{textAlign: "right", height: "100%"}}>
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
          Header: "片名(累计)",
          accessor: "title",
          width: 180
        },
      ]
      if (firsTitleIndex === 0) {
        let dArr = data[0].date.split(',').reverse()
        for(let i = 0; i < dArr.length; i++) {
              let obj = {
                Header: dArr[i],
                accessor: dArr[i],
                Cell: props => <div style={{textAlign: "right", height: "100%",}}>
                <div style={{fontSize: '12px'}}>{props.value === undefined ? 0 : parseInt(props.value).toLocaleString()}</div>
                <div style={{fontSize: '12px'}}>{props.value === undefined ? 0 : props.value[1] * 100 + '%'}</div>
                </div>,
                height: 30
              }
              allArr.push(obj)
            }
          return allArr
      }
      let dArr = data[0].date.split(',').reverse()
        for(let i = 0; i < dArr.length; i++) {
          let str = dArr[i]
              let obj = {
                Header: str,
                accessor: str,
                Cell: props => <div style={{textAlign: "right", height: "100%",}}>
                <div>{props.value === undefined ? 0 : parseInt(props.value).toLocaleString()}</div>
                </div>,
                height: 30
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
            onFetchData={this.fetchData.bind(this)} // Request new data when things change
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

  renderBody() {
    let { segZero, segIndex, firsTitleIndex, kbData, movies} = this.state

    if (firsTitleIndex === 2) {
      return (<UserPhoto movies={movies} />)
    } 

    if (firsTitleIndex === 5) {
      let arr = []
      for (let i = 0; i < kbData.length; i++) {
        let d = kbData[i]
        let item = (
          <div className="kb_item"><span>{d.title}</span><span>{d.date}</span><span>{d.value}</span></div>
        )
        arr.push(item)
      }
      return(<div>
        <div className="kb-title"><span>标题</span><span>上映日期</span><span>评分</span></div>
        {arr}</div>)
    }

    return (<div className="com-sub_header">
      <div style={{display: 'inline-block', width:'40%'}}>
        <span className={segIndex == 0 ? 'segSpanActive' : 'segSpan'} onClick={()=>{this.onValueChange(0)}} style={firsTitleIndex === 4 ? {display: 'none'}: {display: 'inline-block'}} > 绝对时间 </span>
        <span className={segIndex == 1 ? 'segSpanActive' : 'segSpan'} onClick={()=>{this.onValueChange(1)}}> 相对时间 </span>
      </div>
      <div style={{display: 'inline-block', width:'40%', marginLeft: '18%'}}>
        <span className={segZero == 0 ? 'segSpanActive' : 'segSpan'} onClick={()=>{this.setZeroSeg(0)}}> 累计 </span>
        <span className={segZero == 1 ? 'segSpanActive' : 'segSpan'} onClick={()=>{this.setZeroSeg(1)}} style={firsTitleIndex === 4 ? {display: 'none'}: {display: 'inline-block'}} > 新增 </span>
      </div>

      {this.renderDateDiv()}
      {this.renderCalender()}
      {this.renderRange()}
      <div style={{clear: 'both'}}></div>

      {this.renderCharts()}
      {this.renderTable()}
    </div>)
  }
  render(){
    // let cw = document.body.clientWidth
    // let { segZero, segIndex, firsTitleIndex } = this.state

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
        
        {this.renderBody()}

      </div>
    )
  }
}

export default Compare
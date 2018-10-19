import React from 'react'
import { Calendar, Range, Button } from 'antd-mobile'
// import ReactEcharts from 'echarts-for-react'
import EchartsForReact from './EchartsForReact'
import axios from 'axios'

import './comparedetail.css'


// const baseData = [{id : 1, prefix:'wish', title: '猫眼想看'},{id : 2, prefix:'wish', title: '淘票票想看'},{id : 3, prefix:'wish', title: '百度指数'},{id : 4, prefix:'wish', title: '微博指数'},{id : 5, prefix:'wish', title: '微信指数'},{id : 6, prefix:'wish', title: '预售票房'}]

class CompareDetail extends React.Component{
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
      data: [{id : 1, prefix:'maoyan_wish', title: '猫眼想看', disabled: false},{id : 2, prefix:'tpp_wish', title: '淘票票想看', disabled: false},{id : 3, prefix:'baidu_index', title: '百度想看', disabled: false},{id : 4, prefix:'weibo_index', title: '微博指数', disabled: false},{id : 5, prefix:'weixin_index', title: '微信指数', disabled: false},{id : 6, prefix:'first_box', title: '预售票房', disabled: false}],
      dataCls: {maoyan_wish: '猫眼想看', tpp_wish: '淘票票想看', baidu_index: '百度指数', weibo_index: '微博指数', weixin_index: '微信指数', first_box: '预售票房'},
      displayIndex:['maoyan_wish',  'tpp_wish', 'baidu_index', 'weibo_index', 'weixin_index', 'first_box'],
      showDate: [30, 0],
      dateStr: dateStr,
      start: start,
      end: end,
      start2: '-30',
      end2: '0',
      dataLists: [],
      movies: '',
    }
  }
  componentDidMount() {
    let d = JSON.parse(localStorage.getItem('movies'))
    let wish = JSON.parse(sessionStorage.getItem('wish'))
    let ds = JSON.parse(sessionStorage.getItem('displayLists'))

    let {start, end} = this.state
    let arr = d.movies
    let first = d.movie_base
    arr.unshift(first)
    
    let movieStr = arr.toString()
    let target = wish.join(',', '')
    let url = `http://123.56.14.124:918/compare_all/?format=json&target=${target}&type=count&id=${movieStr}&start=${start}&end=${end}`
    if (ds === null) {
      this.setState({
        movies:  movieStr,
        displayIndex: wish
      }, ()=>{
        this.fetchData(url)
      })
    } else {
      this.setState({
        movies:  movieStr,
        displayIndex: wish,
        data: ds
      }, ()=>{
        this.fetchData(url)
      })
    }
    
  }
  fetchData(url) {
    axios.get(url).then(res => {
      this.setState({dataLists: res.data.data, showCalender: false})
    }).catch(err => {
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
    this.props.history.push(`/home/${u.id}`)
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
  setZeroSeg(e) {
    let {segIndex, start, end, segZero, start2, end2, movies, displayIndex} = this.state
    this.setState({
      segZero: e,
    }, ()=> {
      let type = segZero === 0 ? 'up' : 'count'
      let url = ''
      let target = displayIndex.join(',', '')
      if(segIndex === 0) {
          url = `http://123.56.14.124:918/compare_all/?format=json&target=${target}&type=${type}&id=${movies}&start=${start}&end=${end}`
        } else {
          url = `http://123.56.14.124:918/compare_all/?format=json&target=${target}&type=${type}&id=${movies}&start_days=${start2}&end_days=${end2}`
      }
      this.fetchData(url)
    })
  }
  onValueChange(e) {
    console.log(e)
    // const d = ['绝对时间', '相对时间']
    const index = e
    let flag = index === 1 ? true : false
    let {segIndex, start, end, segZero, start2, end2, movies, displayIndex} = this.state

    this.setState({
      showRange: flag,
      segIndex: index
    }, ()=> {
      let url = ''
      let type = segZero === 0 ? 'count' : 'up'
      let target = displayIndex.join(',', '')

      if(segIndex === 1) {
          url = `http://123.56.14.124:918/compare_all/?format=json&target=${target}&type=${type}&id=${movies}&start=${start}&end=${end}`
        } else {
          url = `http://123.56.14.124:918/compare_all/?format=json&target=${target}&type=${type}&id=${movies}&start_days=${start2}&end_days=${end2}`
      }
      this.fetchData(url)
    })
  }
  up(i) {
    let { data } = this.state

    if (i === 0 || data[i].disabled) return
    let arr = data
    let val = arr[i]
    let preVal = arr[i-1]

    arr[i-1] = val
    arr[i] = preVal

    if(arr[i].disabled) {
      let str = `trend_add${i}`
      let str_ = `trend_add${i-1}`
      arr[i-1].disabled = false
      this.refs[str].className = "trend_add_gray"
      this.refs[str_].className = "trend_item_add"
    }

    this.setState({data: arr})
  }
  down(i) {
    let { data } = this.state
    if (i === data.length - 1 || data[i].disabled) return

    let val = data[i]
    let nextVal = data[i+1]

    data[i] = nextVal
    data[i+1] = val

    if(data[i].disabled) {
      let str = `trend_add${i}`
      let str_ = `trend_add${i+1}`
      data[i+1].disabled = false
      this.refs[str].className = "trend_add_gray"
      this.refs[str_].className = "trend_item_add"
    }
    this.setState({data: data})
  }
  add(i) {
    console.log('----------add-----------')
    let { data } = this.state
    //trend_add_gray
    let str = `trend_add${i}`
    if (this.refs[str].className === "trend_item_add") {
      // baseData.splice(i, 1)
      let d = data
      let item = d[i]
      item.disabled = true
      d[i] = item

      let arr = []
      // let arr2 = []
      for(let i = 0; i < d.length; i++) {
        if(!d[i].disabled) {
          arr.push(d[i].prefix)
          // indexArr.push(d[i].id)
        }
      }
      // sessionStorage.setItem('displayLists', JSON.stringify(d))
      this.setState({
        data: d,
        displayIndex: arr
      }, ()=>{
        this.refs[str].className = "trend_add_gray"
      })
    } else {
      let d = data
      let item = d[i]
      item.disabled = false
      d[i] = item
      let arr = []
      for(let i = 0; i < d.length; i++) {
        if(!d[i].disabled) {
          arr.push(d[i].prefix)
          // indexArr.push(d[i].id)
        }
      }
      // sessionStorage.setItem('displayLists', JSON.stringify(d))
      this.setState({
        data: d,
        displayIndex: arr
      }, ()=>{
        this.refs[str].className = "trend_item_add"
      })
    }
  }

  back() {
    console.log('---back-')
    this.setState({editFlag: false})
  }

  save() {
    let user = JSON.parse(localStorage.getItem('user'))
    let { data, segIndex, start, end, segZero, start2, end2, movies } = this.state
    let arr = []
    let indexArr = []
    let arr2 = []
    let aindex = 0
    for(let i = 0; i < data.length; i++) {
      if(!data[i].disabled) {
        arr.push(data[i].prefix)
        indexArr.push(data[i].id)
        arr2.splice(aindex, 0, data[i])
        aindex += 1
      } else {
        arr2.push(data[i])
      }
    }
    sessionStorage.setItem('displayLists', JSON.stringify(arr2))
    sessionStorage.setItem('wish', JSON.stringify(arr))
    this.setState({editFlag: false, displayIndex: arr, data: arr2})

    axios.patch(`http://123.56.14.124:918/user/${user.id}/`, {
      "targets": indexArr
    }).then(res => {
      console.log('替换排序')
      let url = ''
      let type = segZero === 0 ? 'count' : 'up'
      let target = arr.join(',', '')
      if(segIndex === 0) {
          url = `http://123.56.14.124:918/compare_all/?format=json&target=${target}&type=${type}&id=${movies}&start=${start}&end=${end}`
        } else {
          url = `http://123.56.14.124:918/compare_all/?format=json&target=${target}&type=${type}&id=${movies}&start_days=${start2}&end_days=${end2}`
      }
      this.fetchData(url)
    })
  }

  renderEditTrendItem() {
    let {data, displayIndex} = this.state

    let trendArr = []
    for (let i = 0; i < data.length; i++) {
      // let title = arr[i]
      // if(displayIndex.indexOf(data[i].prefix) > -1) {
        let upClassName = ''
        let downClassName = ''
        let addclass = ''
        let itemdata = data[i]

        if (itemdata.disabled) {
          upClassName = 'trend_item_up' 
          downClassName = 'trend_item_cndown'
          addclass = 'trend_add_gray'
        } else {
          upClassName = (i === 0 || displayIndex.indexOf(data[i].prefix) === -1) ? 'trend_item_up' : 'trend_item_canup'
          downClassName = (i === data.length - 1 || displayIndex.indexOf(data[i].prefix) === -1) ? 'trend_item_cndown' : 'trend_item_down'
          addclass = displayIndex.indexOf(data[i].prefix) === -1 ?'trend_add_gray' : 'trend_item_add'
        }

        let rid = `trend_add${i}`
        // let addclass = data[i].disabled ? 'trend_add_gray' : ''
        let item =  (
          <div className="edit-trend_item">
            <span>{ data[i].title }</span>
            <div style={{float: 'right'}}>
            <span className={upClassName} onClick={()=>{this.up(i)}}></span>
            <span className={downClassName} onClick={()=>{this.down(i)}}></span>
            <span className={addclass} ref={rid} onClick={()=>{this.add(i)}}></span></div>
          </div>
        )
        trendArr.push(item)
      // }
    }

    return trendArr
  }

  showCanlender() {
    this.setState({
      showCalender: !this.state.showCalender
    })
  }

  onChange = (e) => {
    console.log(e)
  }

  rangeChange() {
    console.log('range change')
  }

  afteRangeChange = (arr) => {
    console.log(arr)
    let { segZero, movies, displayIndex } = this.state
    this.setState({
      showDate: arr,
      start2: arr[0],
      end2: arr[1]
    }, () => {
      let type = segZero === 0 ? 'count' : 'up'
      let target = displayIndex.join(',', '')
      let url = `http://123.56.14.124:918/compare_all/?format=json&target=${target}&type=${type}&id=${movies}&start_days=${arr[0]}&end_days=${arr[1]}`
      this.fetchData(url)
    })
  }

  onCancel = (e) => {
    console.log(e)
    this.setState({
      showCalender: false
    })
  }

  onConfirm = (a, b) => {
    let { segZero, movies, displayIndex } = this.state
    let start = this.fomartDate(a)
    let end = this.fomartDate(b)
    
    let type = segZero === 0 ? 'count' : 'up'
    let target = displayIndex.join(',', '')

    let url = `http://123.56.14.124:918/compare_all/?format=json&target=${target}&type=${type}&id=${movies}&start=${start}&end=${end}`
    this.fetchData(url)
  }

  goEvent(data) {
    let {segIndex, start, end, segZero, start2, end2, movies} = this.state
    let url = ''
    let type = segZero === 0 ? 'count' : 'up'
    if(segIndex === 0) {
        url = `http://123.56.14.124:918/compare/?format=json&target=maoyan_wish_info&type=${type}&id=${movies}&start=${start}&end=${end}`
      } else {
        url = `http://123.56.14.124:918/compare/?format=json&target=maoyan_wish_info&type=${type}&id=${movies}&start_days=${start2}&end_days=${end2}`
    }
    this.props.history.push({
      pathname: '/event',
      query: url
    })
    // this.props.history.push({
    //   pathname: '/event',
    //   query: data
    // })
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
            onConfirm={this.onConfirm.bind(this)}
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

  getOption = (d) => {
      let { segIndex } = this.state
      let xArr = d.data[0].data.date.split(',').reverse()
      if (segIndex === 1) { 
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
          data: d.data.map(function (item) {
            return item['title']
          })
        },
        grid: {
          top: 85,
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
        series: d.data.map((item) => {
            return {
              name:item['title'],
              type:'line',
              data: item.data.value.split(',')
            }
        })
      };
  };

  renderCharts() {
    let { dataLists, dataCls, displayIndex } = this.state
    let cw = document.body.clientWidth
    if (dataLists.length === 0) return
    // let lists = []
    let arr = []
    for (let i = 0; i < dataLists.length; i++) {
      let d = dataLists[i]
      if(displayIndex.indexOf(d.target_code) > -1) {
      let item = (
        <div className="wish-item_box">
          <div className="wish-title"><span className={`${d.target_code}_icon`}>
            {dataCls[d.target_code]}</span>
            <span className="check-event" style={{display: i === 0 ? 'inline-block' : 'none'}} onClick={()=>{this.goEvent(d)}}>查看事件</span></div>
          {/* <ReactEcharts opts={{renderer: 'svg'}} notMerge={true} lazyUpdate={true} option={this.getOption(d)}/> */}
          <EchartsForReact style={{ width: cw, height: 350 }} option={this.getOption(d)}  showLoading={false} />
        </div>
      )
      arr.push(item)
      }
    }
    return arr
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
          <span className="detail-back" onClick={()=>{this.backHome()}}>返回</span>
          <span className="detail-trend">总趋势</span>
          <span className="detail-compare" onClick={()=>{this.props.history.push('/compare')}}>对比详情</span>
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

          {/* <div className="compare-date" onClick={()=>{this.showCanlender()}}>2018-12-12/2018-12-12</div> */}
          {this.renderDateDiv()}
          {this.renderCalender()}
          {this.renderRange()}

          <div style={{clear: 'both'}}></div>

          {this.renderCharts()}
        </div>
      </div>
    )
  }
}

export default CompareDetail
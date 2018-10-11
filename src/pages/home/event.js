import React from 'react'
import ReactEcharts from 'echarts-for-react'
import axios from 'axios'
import './event.css'

class Event extends React.Component{
  constructor() {
    super()
    this.state = {
      dataLists: [],
      segZero: 0,
    }
  }

  componentWillMount() {
    let u = localStorage.getItem('user')
    if (u != null) {
      this.setState({
        isLogin: true
      })
    }
  }

  componentDidMount() {
    let url = this.props.location.query
    let flag = url.indexOf('count') === -1 ? 1 : 0

    axios.get(url).then(res =>{
      this.setState({
        segZero: flag,
        dataLists: res.data.data.data})
    }).catch(err =>{
      console.log('----err----')
    })
  }

  setZeroSeg(index) {
    // let { segZero } = this.state
    let url = this.props.location.query
    // let flag = url.indexOf('count') === -1 ? 1 : 0
    let url2 = index === 0 ? url.replace('up', 'count') : url.replace('count', 'up')
    axios.get(url2).then(res =>{
      this.setState({
        segZero: index,
        dataLists: res.data.data.data})
    }).catch(err =>{
      console.log('----err----')
    })
  }

  backHome() {
    let u = JSON.parse(localStorage.getItem('user'))
    this.props.history.push(`/comparedetail/${u.id}`)
  }

  getOption = (d) => {
    let xArr = d.data.date.split(',')
    if (xArr[0].length < 4) {
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
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      calculable : true,
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data:  xArr
      },
      yAxis: {
        type: 'value'
      },
      series: {
        name: d['title'],
        type:'line',
        data: d.data.value.split(','),
        // markPoint: {
          // symbol: 'path://m 0,0 h 48 v 20 h -30 l -6,10 l -6,-10 h -6 z', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', path://m 0,0 h 48 v 20 h -30 l -6,10 l -6,-10 h -6 z,  path://m 0,0 h 48 v 20 h -34 l -6,10 l -6,-10 h -2 z
          // symbolSize: function(val){
          //     return [textSize(toHSpeed(val, 2),"12px").width+5,40]
          // },
          // symbolSize: 10,
          // symbolOffset: ['34%', '-50%'],
        //   symbolKeepAspect: true,
        //   showDelay:0,          
        //   itemStyle: {
        //     normal: {
        //       label: {
        //         show: true,
        //         formatter: function (params,ticket,callback) {//格式化展现（标签+值）
        //           return `${params.name} 
        //                      ${params.value}`;
        //          },
        //          position: "Top",
        //         textStyle: {
        //           color: 'red',
        //           fontSize: 12
        //         }
        //     }
        //     },
        // },
        // data: [
        //   { name: '哈哈哈哈哈哈', value: 222, xAxis: 3, yAxis: 40000}
        // ]
      // },
      // markLine: {
      //     data: [
      //         {type: 'average', name: '平均值'}
      //     ]
      // }
      },
    };
  };

  renderEventLists() {
    // let data = this.props.location.query.data
    let { dataLists } = this.state
    if (dataLists.length === 0) return
    let arr = []

    for (let i = 0; i < dataLists.length; i++) {
      let item = (
        <div className="wish-item_box">
          <div className="wish-title_event"><span>
            {dataLists[i].title}</span></div>
          <ReactEcharts opts={{renderer: 'svg'}} notMerge={true} lazyUpdate={true} option={this.getOption(dataLists[i])}/>
        </div>
      )
      arr.push(item)
    }
    
    return arr
  }
  
  render() {
    let { segZero } = this.state
    return (
      <div>
        <div className="comparedetail-header">
          <span className="detail-back" onClick={()=>{this.backHome()}}>返回</span>
          <span>猫眼想看事件</span>
        </div>
        <div style={{display: 'inline-block', width:'100%', textAlign: 'center' }}>
            <span className={segZero == 0 ? 'segSpanActive' : 'segSpan'} onClick={()=>{this.setZeroSeg(0)}}> 累计 </span>
            <span className={segZero == 1 ? 'segSpanActive' : 'segSpan'} onClick={()=>{this.setZeroSeg(1)}}> 新增 </span>
        </div>
        {this.renderEventLists()}
      </div>
    )
  }
}

export default Event
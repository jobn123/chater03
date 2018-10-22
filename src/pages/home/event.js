import React from 'react'
// import ReactEcharts from 'echarts-for-react'
import EchartsForReact from './EchartsForReact';
import axios from 'axios'
import './event.css'
const dataInfo = {
  title : {
      text: '未来一周气温变化',
      subtext: '纯属虚构'
  },
  tooltip : {
      trigger: 'axis'
  },
  // legend: {
  //     data:['最高气温','最低气温']
  // },
  calculable : true,
  xAxis : [
      {
          type : 'category',
          boundaryGap : false,
          data : ['周一','周二','周三','周四','周五','周六','周日']
      }
  ],
  yAxis : [
      {
          type : 'value',
          axisLabel : {
              formatter: '{value} °C'
          }
      }
  ],
  series : [
      {
          name:'最高气温',
          type:'line',
          data:[11, 11, 15, 13, 12, 13, 10],
          markPoint : {
              data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
              ]
          },
          markLine : {
              data : [
                  {type : 'average', name: '平均值'}
              ]
          }
      }
  ]
};

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
    let xArr = d.date.split(',')
    // debugger
    if (xArr[0].length < 4 && xArr[0].length !== 0) {
      let arr = []
      for (let i = 0; i < xArr.length; i++) {
        let v = +xArr[i]
        let str = v > 0 ? `映后${v}天` : '映前' + Math.abs(v) + '天'
        arr.push(str)
      }
      xArr = arr
    }
    //marketing
    let marketing = []
    for (let i = 0; i < d.marketing.length; i++ ) {
      let it = d.marketing[i]
      let xz = ""
      if (it.xAxis.length < 4) {
        xz = +it.xAxis > 0 ? `映后${it.xAxis}天` : '映前' + Math.abs(it.xAxis) + '天'
      } else {
        xz = it.xAxis
      }
      let item = {
        name: it.name,
        xAxis: xz,
        yAxis: it.yAxis
      }
      marketing.push(item)
    }
    // return {
    //   tooltip: {
    //     trigger: 'axis'
    //   },
    //   grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    //   },
    //   calculable : true,
    //   xAxis: {
    //     type: 'category',
    //     boundaryGap: false,
    //     data:  xArr
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: {
    //     name: d['title'],
    //     type:'line',
    //     data: d.data.value.split(',')
    //   },
    // };
    return {
    tooltip : {
        trigger: 'axis',
        extraCssText:'width:160px;height:40px;background:rgba(0, 0, 0, 0.7);'
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : xArr
        }
    ],
    yAxis : [
        {
          type : 'value',
        }
    ],
    series : [
        {
            name: d['title'],
            type: 'line',
            data: d.value.split(',') ,
            markPoint : {
                // data : [
                //     {type : 'max', name: '最大值'}
                //     // {type : 'min', name: '最小值'}
                // ],
              //   data: [
              //     {name: '周最低', value: '', xAxis: '映前20天', yAxis: 5000}
              // ]
              symbolSize: 4,
              data: marketing
            },
            // markLine : {
            //     data : [
            //         {type : 'average', name: '平均值'}
            //     ]
            // }
        }
    ]
    }
  };

  renderEventLists() {
    // let data = this.props.location.query.data
    let { dataLists } = this.state
    if (dataLists.length === 0) return
    let arr = []
    let cw = document.body.clientWidth
    for (let i = 0; i < dataLists.length; i++) {
      let item = (
        <div className="wish-item_box">
          <div className="wish-title_event"><span>
            {dataLists[i].title}</span></div>
          {/* <ReactEcharts opts={{renderer: 'svg'}} notMerge={true} lazyUpdate={true} option={this.getOption(dataLists[i])}/> */}
          <EchartsForReact style={{ width: cw, height: 350 }} option={this.getOption(dataLists[i])}  showLoading={false} theme="infographic"/>
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
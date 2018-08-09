import React from 'react'
import ReactEcharts from 'echarts-for-react'
import './event.css'

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
    this.props.history.push(`/comparedetail/${u.id}`)
  }

  getOption = (d) => {
    let xArr = d.data.date.split(',')
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
        data: d.data.value.split(',')
      }
    };
  };

  renderEventLists() {
    let data = this.props.location.query.data

    let arr = []

    for (let i = 0; i < data.length; i++) {
      let item = (
        <div className="wish-item_box">
          <div className="wish-title_event"><span>
            {data[i].title}</span></div>
          <ReactEcharts opts={{renderer: 'svg'}} notMerge={true} lazyUpdate={true} option={this.getOption(data[i])}/>
        </div>
      )
      arr.push(item)
    }
    
    return arr
  }
  
  render() {
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
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
        markPoint: {
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#000',
              color: '#777',
              label: {
                show: false,
                position: 'inside',
                textStyle: {
                  color: 'black'
                }
            }
            },
        },
          data: [
              { name: 'ok'}
          ]
        },
        markLine: {
            data: [
                {type: 'average', name: '平均值'}
            ]
        }
      },
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
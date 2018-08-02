import React from 'react'
import './comparedetail.css'

class CompareDetail extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      value: "对比组列表",
      editFlag: false,
      segZero: 0,
      segIndex: 0
    }
  }
  edit() {
    console.log('-----edit------')
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
  render(){
    let { editFlag, segZero, segIndex } = this.state
    return (
      <div className="comparedetail">
        <div className="comparedetail-header">
          <span className="detail-back"></span>
          <span className="detail-trend">总趋势</span>
          <span className="detail-compare">对比详情</span>
          <span className="detail-edit"></span>
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
        </div>
      </div>
    )
  }
}

export default CompareDetail
import React from 'react'
import axios from "axios"

class ListContent extends React.Component{
  constructor() {
    super()
    this.state = {
      lists: []
    }
  }
  componentDidMount() {
    let id = this.props.uid
    axios.get(`http://123.56.14.124:918/group/?format=json&userid=${id}`)
    .then((res)=>{
      this.setState({
        lists: res.data.data
      })
    })
  }

  goCompareGroup(id) {
    this.props.goCompareGroup(id)
  }

  goCompoareDetail(item) {
    this.props.goCompoareDetail(item)
  }
  renderLists() {
    let { lists } = this.state

    let arr = []
    for(let i = 0; i < lists.length; i++) {
      let item = lists[i].movie_base_detail[0]
      let listitem = (
        <div key={i}>
          <div className="list-content_img">
            <div className="list-left_title">{item.title}</div>
            <div className="list-left-desc" onClick={()=>{
              this.goCompareGroup(lists[i].id)
            }}>点击可编辑</div>
          </div>
          
          <div ref="wanted-body" className="list-content_right" onClick={()=>{this.goCompoareDetail(lists[i])}}>
            <div className="wanted-item_t"><span>观测指标</span><span>当前值</span><span>日环比</span><span>组排名</span></div>
            <div className="wanted-item"><span className="st1">猫眼想看</span><span>122</span><span>12</span><span>12</span></div>
            <div className="wanted-item"><span className="st2">百度指数</span><span>12</span><span>12</span><span>12</span></div>
            <div className="wanted-item"><span className="st3">微博指数</span><span>12</span><span>12</span><span>12</span></div>
            <div className="wanted-item"><span className="st4">微信指数</span><span>12</span><span>12</span><span>12</span></div>
          </div>
          <div style={{clear: 'both'}}></div>
          <div className="split-line"></div>
        </div>
      )
      arr.push(listitem)
    }

    return arr
  }
  render(){
    return (
      <div className="list-content">
        {this.renderLists()}
      </div>
    )
  }
}

export default ListContent
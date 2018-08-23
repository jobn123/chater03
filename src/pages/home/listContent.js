import React from 'react'
import axios from "axios"

const cls = {
  '猫眼想看': 'st1',
  '百度指数': 'ht1',
  '微博指数': 'st3',
  '微信指数': 'st4',
  '淘票票想看': 'st2',
}

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

  renderItems(data) {
    let arr = []
    for(let i = 0; i < data.length; i++) {
      let item = data[i]
      let name = item.name
      arr.push(<div className="wanted-item"><span className={cls[name]}>{name}</span><span>{item.count}</span><span>{item.percent}</span><span>{item.rank}</span></div>)
    }
    return arr
  }

  renderLists() {
    let { lists } = this.state
    let arr = []
    for(let i = 0; i < lists.length; i++) {
      let item = lists[i]

      let listitem = (
        <div key={i}>
          <div className="list-content_img">
            <div className="list-left_title">{item.title}</div>
            <div className="list-left-desc" onClick={()=>{
              this.goCompareGroup(item.id)
            }}>点击可编辑</div>
          </div>
          
          <div ref="wanted-body" className="list-content_right" onClick={()=>{this.goCompoareDetail(lists[i])}}>
            <div className="wanted-item_t"><span>观测指标</span><span>当前值</span><span>日环比</span><span>组排名</span></div>

            {this.renderItems(item.movie_base_info)}
            {/* <div className="wanted-item"><span className="st1">猫眼想看</span><span>122</span><span>12</span><span>12</span></div>
            <div className="wanted-item"><span className="ht1">百度指数</span><span>12</span><span>12</span><span>12</span></div>
            <div className="wanted-item"><span className="st3">微博指数</span><span>12</span><span>12</span><span>12</span></div>
            <div className="wanted-item"><span className="st4">微信指数</span><span>12</span><span>12</span><span>12</span></div> */}
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
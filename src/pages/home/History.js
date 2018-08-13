import React from 'react'
import  axios from 'axios'

class History extends React.Component{

  constructor() {
    super()
    this.state = {
      lists: [],
      activeIndex: 0
    }
  }

  componentDidMount() {
    this.fetchData(0)
  }

  fetchData(index) {
    axios.get(`http://123.56.14.124:918/history_views/?owner=${index}`)
    .then(res =>{
      this.setState({
        lists: res.data.results
      })
    }).catch(err => {
      console.log(err)
    })
  }

  setActive(index) {
    this.setState({
      activeIndex: index
    }, ()=> {
      this.fetchData(index)
    })
  }

  renderLists() {
    let { lists } = this.state
    let arr = []
    for(let i = 0; i < lists.length; i++) {
      let item = lists[i]

      arr.push(<div><span>{item.title}</span><span>{item.info}</span><span>{item.count}</span></div>) 
    }
    return arr
  }

  render(){
    let { activeIndex } = this.state
    return (
      <div>
        <div className="his-header">
          <span onClick={()=>{this.props.showHistory(false)}}>返回</span>
          <span>历史数据</span>
        </div>

        <div className="his-sub_header">
          <span onClick={()=>{this.setActive(0)}} className={activeIndex === 0 ? 'active': ''}>24小时播放量【非福斯】</span>
          <span onClick={()=>{this.setActive(1)}} className={activeIndex === 1 ? 'active': ''}>24小时播放量【福斯】</span>
        </div>
        
        <div className="his-body">
          { this.renderLists() }
        </div>

      </div>
    )
  }
}

export default History
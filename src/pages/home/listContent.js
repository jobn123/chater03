import React from 'react'
// import { SearchBar } from 'antd-mobile'
// import axios from "axios"

class ListContent extends React.Component{
  constructor() {
    super()
    this.state = {
      value: "",
    }
  }

  render(){
    return (
      <div className="list-content">
        <div>
          <img className="list-content_img" alt="loading..." width="88" height="120" onClick={()=>{}}/>
          <div ref="wanted-body" className="list-content_right" onClick={()=>{}}>
              <div className="wanted-item_t"><span>观测指标</span><span>当前值</span><span>日环比</span><span>组排名</span></div>
              <div className="wanted-item"><span className="st1">猫眼想看</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span className="st2">百度指数</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span className="st3">微博指数</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span className="st4">微信指数</span><span></span><span></span><span></span></div>
            </div>
        </div>
      </div>
    )
  }
}

export default ListContent
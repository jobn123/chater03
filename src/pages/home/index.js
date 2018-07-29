import React from 'react'
import axios from "axios/index"
import { SearchBar, ListView } from 'antd-mobile'
import './index.css'

class Home extends React.Component{
  constructor() {
    super()

    this.state = {
      value: "",
      searchflag: false,
      searchResults: [],
      isLoading: false,
      showSingleFlag: false,
    }
  }
  sindleDetails = {}
  componentDidMount(){
  }
  onChange= (value) => {
    this.setState({ value });
    if(value === "") {
      return this.setState({searchResults: []})
    }

    axios.get(`http://123.56.14.124:918/albums/?format=json&search=${value}&page_size=50`)
    .then(res=>{
      if(res.status===200){
        this.setState({
          searchResults: res.data.results,
        });
      }
    })
  };
  clear = () => {
    this.setState({ value: '' });
  };
  search(val) {
    if(val === "") {
      return this.setState({searchResults: []})
    }

    axios.get(`http://123.56.14.124:918/albums/?format=json&search=${val}&page_size=50`)
    .then(res=>{
      if(res.status===200){
        this.setState({
          searchResults: res.data.results
        });
      }
    })
  }
  showSingle(item) {
    this.sindleDetails = item
    this.setState({
      showSingleFlag: true
    })
  }
  renderHomeBody() {
    let { searchflag, searchResults } = this.state
    if (searchResults.length === 0) {
      return (<div>
        <p>请选择右上角『+』按钮创影片建对比组</p>
          <div className="home-bg"> </div>
      </div>)
    } else {
      let arr = []
      for(let i = 0; i < searchResults.length; i++) {
        let cname = (i + 1) % 2 === 0 ? 's-item_g' : 's-item'
        let item = (<div key={i} className={cname} onClick={()=>{this.showSingle(searchResults[i])}}>
          {searchResults[i].title}
        </div>)
        arr.push(item)
      }
      return arr
    }
  }
  render(){
    let { showSingleFlag } = this.state
    if (showSingleFlag) {
      let dl = this.sindleDetails
      return (
        <div className="singleDetail">
            <div className="singleDetail_title">
            <span onClick={()=>{}}>返回</span>
            <span>{dl.title}</span></div>
            <div className="singleDetail_sub">{dl.show_time}上映</div>

            <div className="single-wanted" ref="">
              <div className="wanted-title">
                <span>想看</span><span className="down-pic"></span></div>
              <div className="wanted-item_t"><span>观测指标</span><span>当前值</span><span>变化值</span><span>日环比</span></div>
              <div className="wanted-item"><span className="st1">猫眼</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span className="st2">淘票票</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span className="st3">微博</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span className="st4">微信</span><span></span><span></span><span></span></div>
            </div>
  
            <div className="single-hot">
              <div className="wanted-title"><span>热度</span><span></span></div>
              <div className="hot-item_t"><span>观测指标</span><span>当前值</span><span>日环比</span></div>
              <div className="wanted-item"><span>百度</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>微博</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>阅读</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>讨论</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>微信</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>豆瓣</span><span></span><span></span><span></span></div>
            </div>
  
            <div className="single-mate">
              <div className="wanted-title"><span>物料</span><span></span></div>
              <div className="wanted-item_t"><span>观测指标</span><span>当前值</span><span>昨日值</span><span>日环比</span></div>
              <div className="wanted-item"><span>百度</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>微博</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>阅读</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>讨论</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>微信</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>豆瓣</span><span></span><span></span><span></span></div>
            </div>
  
            <div className="single-sale">
              <div className="wanted-title"><span>预售</span><span></span></div>
              <div className="wanted-item_t"><span>观测指标</span><span>当前值</span><span>昨日值</span><span>日环比</span></div>
              <div className="wanted-item"><span>零点场</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>首日票房</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>首日排片</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>首日场次</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>大盘场次</span><span></span><span></span><span></span></div>
            </div>
  
            <div className="single-sale">
              <div className="wanted-title"><span>口碑</span><span></span></div>
              <div className="wanted-item_t"><span>观测指标</span><span>当前值</span><span>昨日值</span><span>日环比</span></div>
            </div>

            <div className="single-suser">
              <div className="wanted-title"><span>用户画像</span><span></span></div>
            </div>
        </div>
      )
    }
    return (
      <div>
          <div className="header">
            首页
          </div>

          <div className="home-content">
          <SearchBar
            className="home-saerch"
            value={this.state.value}
            placeholder="搜索影片名"
            onSubmit={value => this.search(value)}
            onFocus={() => console.log('onFocus')}
            onBlur={() => console.log('onBlur')}
            showCancelButton = {true}
            cancelText=""
            onChange={this.onChange}
          />
          {this.renderHomeBody()}
          </div>
      </div>
    )
  }
}

export default Home
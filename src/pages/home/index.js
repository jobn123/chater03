import React from 'react'
import axios from "axios/index"
import { SearchBar } from 'antd-mobile'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import ListContent from './listContent'

import './index.css'

class Home extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      value: "",
      searchflag: false,
      searchResults: [],
      isLoading: false,
      showSingleFlag: false,
      listHomeContent: false,
      showHistory: false,
      showItem1: false,
      showItem2: false,
      showItem3: false,
      showItem4: false,
      showItem5: false,
      showItem6: false,
    }
  }
  sindleDetails = {}
  componentWillMount(){
    let { id } = this.props.match.params
    let u = JSON.parse(localStorage.getItem('user'))
    if (id !== undefined || u !== null) {
      this.setState({
        listHomeContent: true
      })
    }
  }
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
    let { searchResults, listHomeContent } = this.state
    let u = JSON.parse(localStorage.getItem('user'))
    let id  = this.props.match.params.id || u.id
    if (listHomeContent) {
      return(<ListContent uid={id} goCompareGroup={this.goCompareGroup.bind(this)}/>)
    }
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

  goCompareGroup(id) {
    this.props.history.push(`/groupcompare/${id}`)
  }

  closewin(str) {
    this.setState({
      showItem1: !this.state.showItem1
    })
  }
  showHistory(flag) {
    this.setState({
      showSingleFlag: !flag,
      showHistory: flag
    })
  }
  render(){
    let { showSingleFlag, showHistory, showItem1, showItem2, showItem3, showItem4, showItem5, showItem6 } = this.state
    const data = [
      { name: 'food', uv: 2000, pv: 2013, amt: 4500, time: 1, uvError: [100, 50], pvError: [110, 20] },
      { name: 'cosmetic', uv: 3300, pv: 2000, amt: 6500, time: 2, uvError: 120, pvError: 50 },
      { name: 'storage', uv: 3200, pv: 1398, amt: 5000, time: 3, uvError: [120, 80], pvError: [200, 100] },
      { name: 'digital', uv: 2800, pv: 2800, amt: 4000, time: 4, uvError: 100, pvError: 30 },
    ];
    if (showSingleFlag) {
      let dl = this.sindleDetails
      return (
        <div className="singleDetail">
            <div className="singleDetail_title">
            <span onClick={()=>{}}>返回</span>
            <span>{dl.title}</span></div>
            <div className="singleDetail_sub">{dl.show_time}上映</div>

            <div className="single-wanted" ref="wanted">
              <div className={showItem1 ? "wanted-title_up" : "wanted-title"}>
                <span>想看</span><span className={showItem1 ? "up-pic" : "down-pic"} onClick={()=>{this.setState({
      showItem1: !this.state.showItem1})}}></span></div>
              <div ref="wanted-body" style={{display: showItem1 ? 'block' : 'none'}}>
              <div className="wanted-item_t"><span>观测指标</span><span>当前值</span><span>变化值</span><span>日环比</span></div>
              <div className="wanted-item"><span className="st1">猫眼</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span className="st2">淘票票</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span className="st3">微博</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span className="st4">微信</span><span></span><span></span><span></span></div>
            </div></div>
  
            <div className="single-wanted">
              <div className={showItem2 ? "wanted-title_up" : "wanted-title"}><span>热度</span><span className={showItem2 ? "up-pic" : "down-pic"} onClick={()=>{this.setState({
      showItem2: !this.state.showItem2})}}></span></div>
              <div ref="hot-body" style={{display: showItem2 ? 'block' : 'none'}}>
              <div className="hot-item_t"><span>观测指标</span><span>当前值</span><span>日环比</span></div>
              <div className="wanted-item"><span>百度</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>微博</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>阅读</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>讨论</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>微信</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>豆瓣</span><span></span><span></span><span></span></div></div>
            </div>
                
            <div className="single-wanted">
              <div className={showItem3 ? "wanted-title_up" : "wanted-title"}><span>物料</span><span className={showItem3 ? "up-pic" : "down-pic"} onClick={()=>{this.setState({
      showItem3: !this.state.showItem3})}}></span><span style={{display: showItem3 ? 'block' : 'none'}} className="checkHistory" onClick={()=>{this.showHistory(true)}}>查看历史</span></div>
              <div ref="mate-body" style={{display: showItem3 ? 'block' : 'none'}}>
              <div className="wanted-item_t"><span>观测指标</span><span>当前值</span><span>昨日值</span><span>日环比</span></div>
              <div className="wanted-item"><span>百度</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>微博</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>阅读</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>讨论</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>微信</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>豆瓣</span><span></span><span></span><span></span></div></div>
            </div>
  
            <div className="single-wanted">
              <div className={showItem4 ? "wanted-title_up" : "wanted-title"}><span>预售</span><span className={showItem4 ? "up-pic" : "down-pic"} onClick={()=>{this.setState({
      showItem4: !this.state.showItem4})}}></span></div>
              <div ref="sale-body" style={{display: showItem4 ? 'block' : 'none'}}>
              <div className="wanted-item_t"><span>观测指标</span><span>当前值</span><span>昨日值</span><span>日环比</span></div>
              <div className="wanted-item"><span>零点场</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>首日票房</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>首日排片</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>首日场次</span><span></span><span></span><span></span></div>
              <div className="wanted-item"><span>大盘场次</span><span></span><span></span><span></span></div></div>
            </div>

            <div className="single-wanted">
              <div className={showItem5 ? "wanted-title_up" : "wanted-title"}><span>口碑</span><span className={showItem5 ? "up-pic" : "down-pic"} onClick={()=>{this.setState({
      showItem5: !this.state.showItem5})}}></span></div>
              <div ref="kb-body" style={{display: showItem5 ? 'block' : 'none'}}>
              <div className="wanted-item_t"><span>观测指标</span><span>当前值</span><span>昨日值</span><span>日环比</span></div></div>
            </div>

            <div className="single-wanted">
              <div className={showItem6 ? "wanted-title_up" : "wanted-title"}><span>用户画像</span><span className={showItem6 ? "up-pic" : "down-pic"} onClick={()=>{this.setState({
      showItem6: !this.state.showItem6})}}></span></div>
              <div ref="user-body" style={{display: showItem6 ? 'block' : 'none'}}>
              <div className="user-sex">
                <p>受众性别</p>
                <div className="user-sex_div"><span>猫眼</span>
                <span className="sex-my-male"></span>
                <span className="sex-my-female"></span></div>
                <div className="user-sex_div"><span>淘票票</span>
                <span className="sex-my-male"></span>
                <span className="sex-my-female"></span></div>
              </div>

              <div className="user-age">
                <p>年龄分布</p>
                <BarChart width={321} height={161} data={data}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                {/* <Tooltip/> */}
                {/* <Legend /> */}
                <Bar dataKey="pv" fill="#FF574D" barSize={10}/>
                <Bar dataKey="uv" fill="#108EE9" barSize={10}/>
                </BarChart>
              </div>
              
              <div className="user-area">
                <p>淘票票地域分布</p>
                <BarChart width={321} height={161} data={data}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name" stroke="#8884d8"/>
                <YAxis/>
                <Bar dataKey="pv" fill="#FF574D" barSize={10}/>
                </BarChart>
              </div>
              </div>
            </div>
        </div>
      )
    } else if(showHistory) {
      return (<div onClick={()=>{this.showHistory(false)}}>历史记录</div>)
    }
    return (
      <div>
          <div className="header">
            首页
            <span className="header-user" onClick={()=>{this.props.history.push('/login')}}></span>
            <span className="header-add" onClick={()=>{this.props.history.push('/group')}}></span>
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



import React from 'react'
import axios from "axios/index"
import { SearchBar } from 'antd-mobile'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid} from 'recharts'
import ListContent from './listContent'
import SingleDetail from './singledetail'
import History from './History'

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
          listHomeContent: false,
        });
      }
    })
  };
  clear = () => {
    let {searchResults, listHomeContent} = this.state
    // debugger
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
    
    if (listHomeContent) {
      let u = JSON.parse(localStorage.getItem('user'))
      let id  = this.props.match.params.id || u.id
      
      return(<ListContent uid={id} 
        goCompoareDetail={this.goCompoareDetail.bind(this)}               
        goCompareGroup={this.goCompareGroup.bind(this)}/>)
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
  goCompoareDetail(item) {
    localStorage.setItem('movies', JSON.stringify(item))
    this.props.history.push({
      pathname: `/comparedetail/${item.id}`,
      query: item
    })
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
  hideSingleDetail() {
    this.setState({showSingleFlag: false})
  }
  render(){
    let { showSingleFlag, showHistory } = this.state
    
    if (showSingleFlag) {
      return (
        <SingleDetail sindleDetails={this.sindleDetails} aid={this.sindleDetails.id} hideSingleDetail={this.hideSingleDetail.bind(this)} showHistory={this.showHistory.bind(this)} />
      )
    } else if(showHistory) {
      return (<History showHistory={this.showHistory.bind(this)}/>)
      // return (<div onClick={()=>{this.showHistory(false)}}>历史记录</div>)
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



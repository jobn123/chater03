import React from 'react'
import { NavBar, Icon, SearchBar } from 'antd-mobile'
import axios from "axios"
import './group.css'

class Group extends React.Component{
  constructor() {
    super()
    this.state = {
      value: "搜索影片名",
      showSearchResults: false,
      searchResults: [],
    }
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
          showSearchResults: true,
          searchResults: res.data.results,
        });
      }
    })
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
  clear = () => {
    this.setState({ value: '' });
  };
  goRegisPage() {
    this.props.history.push('/login')
  }
  goHomePage() {
    this.props.history.push('/')
  }
  showSingle() {
    
  }
  renderBody() {
    let { searchResults } = this.state
  
    if (searchResults.length === 0) {
      return (
        <div className="group-body_desc"> 
          <p>说明：</p>
          <p>1、搜索影片名后，点击 <i className="g-heart"/> 即添加该影片为主要影片，只能添加一个且必选;</p>
          <p>2、搜索影片名后，点击 <i className="g-add"/>  即添加该影片为对比影片，且最多只能添加七个;</p>
        </div>
      )
    } else {
      let arr = []
      for(let i = 0; i < searchResults.length; i++) {
        let cname = (i + 1) % 2 === 0 ? 's-item_g' : 's-item'
        let item = (<div key={i} className={cname} onClick={()=>{this.showSingle(searchResults[i])}}>
          {searchResults[i].title}
          <i className="" />
          <i className="" />
        </div>)
        arr.push(item)
      }
      return arr
    }
  }
  render(){
    return (
      <div className="home-group">
         <div className="group-header"> 
          <span className="header-back">返回</span>
          {/* <input type="search" placeholder="请输入影片" /> */}
          <SearchBar
            className="group-saerch"
            value={this.state.value}
            placeholder="搜索影片名"
            onSubmit={value => this.search(value)}
            onFocus={() => console.log('onFocus')}
            onBlur={() => console.log('onBlur')}
            showCancelButton = {true}
            cancelText=" "
            onChange={this.onChange}
          />
          <span className="header-fin">完成</span>
         </div>
        
         <div className="group-body">
          {this.renderBody()}
         </div>
      </div>
    )
  }
}

export default Group
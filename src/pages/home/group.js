import React from 'react'
import { SearchBar } from 'antd-mobile'
import axios from "axios"
import './group.css'

class Group extends React.Component{
  constructor() {
    super()
    this.state = {
      value: "",
      showSearchResults: false,
      searchResults: [],
      groups: [],
      selectMain: false
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
  addMainitem(item, index) {
    let {selectMain, groups} = this.state
    
    if (selectMain) return
    let str = `group-heart_${index}`
    let cname = this.refs[str].className
    let arr = groups
    
    if (cname === "group-heart_gray") {
      let obj = {
        id: item.id,
        title: item.title,
        index: index
      }
      arr.unshift(obj)
      this.setState({
        selectMain: true
      }, ()=>{
        this.refs[str].className = "g-hearts"
      })
    } else {
      this.refs[str].className = "group-heart_gray"
      arr.shift()
    }
  }
  delGroup(item, index) {
    let arr = this.state.groups
    arr.splice(index, 1)
    if (index === 0 && this.state.selectMain) {
      this.setState({
        groups: arr,
        selectMain: false
      },()=>{
        let str = `group-heart_${item.index}`
        this.refs[str].className = "group-heart_gray"
      })
    }
    this.setState({
      groups: arr
    }, ()=>{
      let str = `group-add_${item.index}`
      this.refs[str].className = "group-add_gray"
    })
  }
  addGroups(item, index) {
    let { groups } = this.state
    //
    let str = `group-add_${index}`
    let cname = this.refs[str].className
    let arr = groups

    if (cname === "group-add_gray") {
      if(arr.length > 7) return
      let obj = {
        id: item.id,
        title: item.title,
        index: index
      }
      arr.push(obj)
      
      this.setState({
        groups: arr
      }, ()=>{
        this.refs[str].className = "g-add"
      })
    } else {
      this.refs[str].className = "group-add_gray"
      arr.forEach((it, index) => {
        if(it.id === item.id) {
          arr.splice(index , 1)
        }
      });
      this.setState({
        groups: arr
      })
    }
  }
  getGroupsData() {
    let { groups } = this.state
    let arr = []
    groups.forEach((item)=>{
      arr.push(item.id)
    }) 
    // return arr
    this.props.history.push('/home/12')
  }
  renderBody() {
    let { searchResults, groups, selectMain } = this.state
    
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
        let item = (<div key={i} className={cname}>
          <span style={{paddingRight: '16px'}}>{searchResults[i].title}</span>
          <div className="groupicons">
            <i className="group-heart_gray" ref={`group-heart_${i}`} onClick={()=>{this.addMainitem(searchResults[i], i)}} />
            <i className="group-add_gray" ref={`group-add_${i}`} onClick={()=>{ this.addGroups(searchResults[i], i)}}/>
          </div>
        </div>)
        arr.push(item)
      }
      //选择对比组
      if (groups.length > 0) {
        let garrs = []
        for(let j = 0; j < groups.length; j++) {
          let item = groups[j]
          let cname = (j === 0 && selectMain) ? 'span-red' : 'span-blue'
          let spanItem = (<span className={cname}>{item.title} <i onClick={()=>{this.delGroup(item, j)}} className="span-blue_i" /></span>)
          garrs.push(spanItem)
        }
        return (<div>
          <div>{garrs}</div>
          { arr }
        </div>)
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
          <span className="header-fin" onClick={()=>{ this.getGroupsData()} }>完成</span>
         </div>
        
         <div className="group-body">
          {this.renderBody()}
         </div>
      </div>
    )
  }
}

export default Group
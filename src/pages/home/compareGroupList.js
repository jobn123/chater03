import React from 'react'
import { SearchBar } from 'antd-mobile'
import axios from 'axios'
import './index.css'

class CompareGroupList extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      value: "对比组列表",
      editFlag: false,
      showAdd: false,
      groupList: [],
      groups: [],
    }
  }

  componentDidMount() {
    this.fetchData()
  }
  fetchData() {
    let { id } = this.props.match.params
    axios.get(`http://123.56.14.124:918/group/${id}/?format=json`)
    .then(res => {
      let d = res.data.data
      let g = d.movies
      g.unshift(d.movie_base)
      this.setState({
        groups: g,
        groupList: d.info
      })
    })
  }
  updateGroupLsits() {
    let { id } = this.props.match.params
    let {groups} = this.state

    let base = groups.shift()
    let u = JSON.parse(localStorage.getItem('user'))
    let uid = u === null ? 1 : u.id
    // debugger
    axios.put(`http://123.56.14.124:918/group/${id}/`, {
      "movie_base": base,
      "user": uid,
      "movies": groups
    }).then(res =>{
      if(res.status === 200) {
        console.log('--------更新组--------')
        this.setState({
          editFlag: false
        })
        this.fetchData()
      }
    })
  }
  edit() {
    console.log('-----edit------')
    let { editFlag } = this.state
    let fl = editFlag ? true : false
    this.setState({
      editFlag: !this.state.editFlag,
      showAdd: fl
    })
  }

  addMainitem() {

  }

  addGroups(id, index) {
    let { groups } = this.state
    let str = `group-add_${index}`
    let str2 = `group-heart_${index}`

    let cname = this.refs[str].className
    let cname2 = this.refs[str2].className 

    if (cname === "group-add_gray" && cname2 === 'group-heart_gray') {
      let arr = groups
      arr.push(id)

      this.setState({
        groups: arr
      }, ()=>{
        this.refs[str].className = "g-add"
      })
    } else {
      groups.forEach((item, i) =>{
        if (item === id) {
          console.log('-----------test')
          groups.splice(i, 1)
        }
      })
      this.setState({
        groups: groups
      },() =>{
        this.refs[str].className = "group-add_gray"
      })
    }
  }
  showdelGroup(flag) {
    if (flag) {
      this.refs.del.style.display = 'block'
    } else {
      this.refs.del.style.display = 'none'
    }
  }
  delGroup() {
    console.log('------删除组------')
    this.refs.del.style.display = 'none'
    let { id } = this.props.match.params
    axios.delete(`http://123.56.14.124:918/group/${id}/`)
    .then(res =>{
      if (res.data === "") {
        console.log('------删除组成功------')
        let u = JSON.parse(localStorage.getItem('user'))
        this.props.history.push(`/home/${u.id}`)
      }
    })
  }
  renderGroupLists() {
    let { groupList, editFlag } = this.state

    if(groupList.length === 0) return
    let arr = []
    for(let i = 0; i < groupList.length; i++) {
      let cname = i === 0 ? "g-hearts" : "group-heart_gray"
      let cname2 = i === 0 ? "group-add_gray" : "g-add"
      let item = (
        <div className="s-item" key={i}>
          <span style={{paddingRight: '16px'}}>{groupList[i].title}</span>
          <div className="groupicons" style={{display: editFlag ? 'block' : 'none'}}>
            <i className={cname} ref={`group-heart_${i}`} onClick={()=>{this.addMainitem()}} />
            <i className={cname2} ref={`group-add_${i}`} onClick={()=>{ this.addGroups(groupList[i].id, i)}}/>
          </div>
        </div>
      )
      arr.push(item)
    }
    return arr
  }

  render(){
    let { editFlag, showAdd } = this.state
    if (showAdd) {
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
         </div>
      </div>
      )
    }

    return (
      <div className="compareLsits">
        <div className="compare-header">
          <span>返回</span> 对比组列表 <span className={editFlag ? "compare-add" : "compare-edit"} onClick={()=>{this.edit()}}></span></div>

        {/* xxxxxx */}
        {this.renderGroupLists()}

        <div className="compare-footer" style={{display: editFlag ? 'block' : 'none'}}>
          <span className="del-group" onClick={()=>{this.showdelGroup(true)}}>删除本组</span>
          <span className="save-group" onClick={()=>{this.updateGroupLsits()}}>保存</span>
        </div>

        <div className="del-groups" ref="del" style={{display: 'none'}}>
          <div className="del-groups_desc">你确认要删除本对比组？</div>
          <div className="del-groups_btns">
          <span onClick={()=>{this.showdelGroup(false)}}>取消</span>
          <span onClick={()=>{this.delGroup()}}>确认</span></div>
        </div>

      </div>
    )
  }
}

export default CompareGroupList
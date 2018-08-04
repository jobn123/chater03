import React from 'react'
import { SearchBar } from 'antd-mobile'
import axios from 'axios'
import './index.css'

class CompareGroupList extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      editFlag: false,
      showAdd: false,
      groupList: [],
      groups: [],
      searchResults:[]
    }
  }

  componentDidMount() {
    this.fetchData()
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
  addGroupsItem(item, index) {
    let { groupList, groups } = this.state
    let str = `group-add_${index}`
    let str2 = `group-heart_${index}`

    let cname = this.refs[str].className
    let cname2 = this.refs[str2].className 

    if (cname === "group-add_gray" && cname2 === 'group-heart_gray') {
      if(groupList.length > 7) return
      let arr = groupList
      let g = groups
      //去除重复
      if(g.includes(it.id)) return

      let it = {
        index: arr.lengh,
        title: item.title,
        id: item.id
      }
      arr.push(it)
      g.push(it.id) 
      
      this.setState({
        groupList: arr,
        groups: g
      }, ()=>{
        this.refs[str].className = "g-add"
      })
    } else {
      groupList.forEach((val, i) =>{
        if (val.id === item.id) {
          console.log('-----------test')
          groupList.splice(i, 1)
        }
      })

      let ix = groups.indexOf(item.id)
      groups.splice(ix, 1)

      this.setState({
        groups: groups,
        groupList: groupList
      },() =>{
        this.refs[str].className = "group-add_gray"
      })
    }
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
  delGroupItem(item, index) {
    debugger
    let arr = this.state.groupList
    arr.splice(index, 1)
    if (index === 0) {
      this.setState({
        groupList: arr,
      },()=>{
        let str = `group-heart_${item.index}`
        this.refs[str].className = "group-heart_gray"
      })
      return
    }
    this.setState({
      groupList: arr
    }, ()=>{
      let str = `group-add_${item.index}`
      this.refs[str].className = "group-add_gray"
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
  renderGroupSearchBody() {
    let { searchResults, groups, groupList } = this.state
    let arr = []
      for(let i = 0; i < searchResults.length; i++) {
        let cname = (i + 1) % 2 === 0 ? 's-item_g' : 's-item'
        let item = (<div key={i} className={cname}>
          <span style={{paddingRight: '16px'}}>{searchResults[i].title}</span>
          <div className="groupicons">
            <i className="group-heart_gray" ref={`group-heart_${i}`} onClick={()=>{this.addMainitem(searchResults[i], i)}} />
            <i className="group-add_gray" ref={`group-add_${i}`} onClick={()=>{ this.addGroupsItem(searchResults[i], i)}}/>
          </div>
        </div>)
        arr.push(item)
      }
      //选择对比组
      if (groupList.length > 0) {
        let garrs = []
        for(let j = 0; j < groupList.length; j++) {
          let item = groupList[j]
          let cname = (j === 0) ? 'span-red' : 'span-blue'
          let spanItem = (<span className={cname}>{item.title} <i onClick={()=>{this.delGroupItem(item, j)}} className="span-blue_i" /></span>)
          garrs.push(spanItem)
        }
        return (<div>
          <div>{garrs}</div>
          { arr }
        </div>)
      }
      return arr
  }
  backHome() {
    let { editFlag } = this.state
    if (editFlag) {
      return this.setState({
        editFlag: false
      })
    }
    let u = JSON.parse(localStorage.getItem('user'))
    let uid = u === null ? 1 : u.id
    this.props.history.push(`/home/${uid}`)
  }
  render(){
    let { editFlag, showAdd } = this.state
    if (showAdd) {
      return (
        <div className="home-group">
         <div className="group-header"> 
          <span className="header-back" onClick={()=>{ this.edit()} }>返回</span>
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
          <span className="header-fin" onClick={()=>{ this.edit()} }>完成</span>
         </div>
        
         <div className="group-body">
          {this.renderGroupSearchBody()}
         </div>
      </div>
      )
    }

    return (
      <div className="compareLsits">
        <div className="compare-header">
          <span onClick={()=>{ this.backHome()} }>返回</span> 对比组列表 <span className={editFlag ? "compare-add" : "compare-edit"} onClick={()=>{this.edit()}}></span></div>

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
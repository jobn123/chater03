import React from 'react'
import './index.css'

class CompareGroupList extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      value: "对比组列表",
      editFlag: false
    }
  }
  edit() {
    console.log('-----edit------')
    this.setState({
      editFlag: !this.state.editFlag
    })
  }
  addMainitem() {

  }
  addGroups() {

  }
  render(){
    let { editFlag } = this.state
    return (
      <div className="compareLsits">
        <div className="compare-header">
          <span>返回</span> 对比组列表 <span className={editFlag ? "compare-add" : "compare-edit"} onClick={()=>{this.edit()}}></span></div>

        {/* xxxxxx */}
        <div className="s-item">
          <span style={{paddingRight: '16px'}}>xx</span>
          <div className="groupicons">
            <i className="group-heart_gray" ref={`group-heart_$`} onClick={()=>{this.addMainitem()}} />
            <i className="group-add_gray" ref={`group-add_$`} onClick={()=>{ this.addGroups()}}/>
          </div>
        </div>
  
        <div className="s-item">
          <span style={{paddingRight: '16px'}}>xxxxx</span>
          <div className="groupicons">
            <i className="group-heart_gray" ref={`group-heart_$`} onClick={()=>{this.addMainitem()}} />
            <i className="group-add_gray" ref={`group-add_$`} onClick={()=>{ this.addGroups()}}/>
          </div>
        </div>

        <div className="compare-footer" style={{display: editFlag ? 'block' : 'none'}}>
          <span className="del-group">删除本组</span>
          <span className="save-group">保存</span>
        </div>
      </div>
    )
  }
}

export default CompareGroupList
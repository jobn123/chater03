import React from 'react'
import { InputItem } from 'antd-mobile'
import axios from "axios/index"
import './index.css'

class Register extends React.Component{
  constructor() {
    super()
  }

  goRegisPage() {
    this.props.history.push('./register')
  }

  regis() {
    let name = this.refs.uname.state.value
    let pwd = this.refs.upwd.state.value
    let rpwd = this.refs.urpwd.state.value
    if(pwd != rpwd) {
      return alert('两次输入密码不一致')
    }
    axios.post('http://123.56.14.124:918/user/', {
      "account": name,
      "password": pwd
    }).then((res)=>{
      let d = res.data
      if(d.account === name && d.password === pwd) {
        this.props.history.push('/login')
      } else if(d.message === "success") {
        alert('账号已存在')
      }
    })
  }
  render(){
    return (
      <div>
        <div className="login-header">
          <span className="login-back">back</span>
          <span className="login-regis" onClick={()=>{this.goRegisPage()}}>登录</span>
        </div>

        <div className="login-content">
        <InputItem
            ref="uname"
            placeholder="请输入您的用户名"
          >
            <div className="login-user_img"></div>
          </InputItem>
          <InputItem
            ref="upwd"
            type="password"
            placeholder="请输入密码"
          >
            <div className="login-user_pwd"></div>
          </InputItem>

          <InputItem
            ref="urpwd"
            type="password"
            placeholder="请再次输入密码"
          >
            <div className="login-user_pwd"></div>
          </InputItem>
          <div className="login-btn" onClick={()=>{this.regis()}}>注册</div>
        </div>
        
      </div>
    )
  }
}

export default Register
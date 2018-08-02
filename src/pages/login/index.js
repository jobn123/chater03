import React from 'react'
import { InputItem } from 'antd-mobile'
import axios from "axios/index"
import './index.css'

class Login extends React.Component{
  constructor() {
    super()
    this.state = {
      value: "搜索影片名"
    }
  }

  goRegisPage() {
    this.props.history.push('/register')
  }

  goHomePage() {
    this.props.history.push('/')
  }
  
  login() {
    let name = this.refs.uname.state.value
    let pwd = this.refs.upwd.state.value

    axios.post('http://123.56.14.124:918/user/', {
      "account": name,
      "password": pwd
    }).then((res)=>{
      let d = res.data
      if (d.account === name && d.password === pwd) {
        localStorage.setItem('user', JSON.stringify(res.data))
        this.props.history.push('/')
      } else {
        alert('用户不存在，请点击注册按钮注册账号')
      }
    })
  }

  render(){
    return (
      <div>
        <div className="login-header">
          <span className="login-back" onClick={()=>{this.goHomePage()}}>back</span>
          <span className="login-regis" onClick={()=>{this.goRegisPage()}}>注册</span>
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

          <div className="login-btn" onClick={()=>{this.login()}}>登录</div>
        </div>
        
      </div>
    )
  }
}

export default Login
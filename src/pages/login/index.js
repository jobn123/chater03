import React from 'react'
import { InputItem } from 'antd-mobile'
import './index.css'

class Login extends React.Component{
  constructor() {
    super()
    this.state = {
      value: "搜索影片名"
    }
  }

  goRegisPage() {
    this.props.history.push('/login')
  }

  goHomePage() {
    this.props.history.push('/')
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
            placeholder="请输入您的用户名"
          >
            <div className="login-user_img"></div>
          </InputItem>
          <InputItem
            placeholder="请输入密码"
          >
            <div className="login-user_pwd"></div>
          </InputItem>

          <div className="login-btn">登录</div>
        </div>
        
      </div>
    )
  }
}

export default Login
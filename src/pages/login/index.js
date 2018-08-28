import React from 'react'
import { InputItem } from 'antd-mobile'
import axios from "axios/index"
import './index.css'

class Login extends React.Component{
  constructor() {
    super()
    this.state = {
      isLogin: false
    }
  }
  componentWillMount() {
    let u = localStorage.getItem('user')
    if (u != null) {
      this.setState({
        isLogin: true
      })
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
      if (d.account === name && d.message === "success") {
        localStorage.setItem('user', JSON.stringify(res.data))
        this.props.history.push('/')
      } else {
        alert('用户不存在，或密码错误')
      }
    })
  }
  exit() {
    localStorage.removeItem('user')
    this.goHomePage()
  }
  renderLogin() {
    let { isLogin } = this.state

    if (!isLogin) {
      return (
        <div>
        <div className="login-header">
          <span className="login-back" onClick={()=>{this.goHomePage()}}>返回</span>
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
        </div></div>
      )
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      return (
        <div>
          <div className="login-header">
            <span className="login-back" onClick={()=>{this.goHomePage()}}>返回</span>
            <span className="login-regis" onClick={()=>{this.exit()}}>退出</span>
          </div>
        
          {/* <div className=""> */}
            <div style={{textAlign: 'center', fontSize: '16px', marginTop: '80px'}}>{user.account}已登录</div>
            <div className="home-bg"> </div>
          {/* </div> */}
        </div>
      )
    }
  }

  render(){
    return (
      <div>
        {this.renderLogin()}
      </div>
    )
  }
}

export default Login
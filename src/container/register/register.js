import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import holyForm from '../../component/holy-form/holy-form'
import {Redirect} from 'react-router-dom'

@connect(
  state=>state.user,
  {register}
)
@holyForm
class Register extends React.Component{
  constructor(props){
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
  }

  componentDidMount(){
    this.props.handleChange('type','genius')
  }

  handleRegister(){
    this.props.register(this.props.state)
  }

  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
        <Logo/>
        <List>
          {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
          <InputItem onChange={v=>this.props.handleChange('user',v)}
          >用户名</InputItem>
          <InputItem onChange={v=>this.props.handleChange('pwd',v)} type='password'
          >密码</InputItem>
          <InputItem onChange={v=>this.props.handleChange('repeatpwd',v)} type='password'
          >确认密码</InputItem>
          <WhiteSpace/>
          <RadioItem
            checked={this.props.state.type==='genius'}
            onChange={()=>this.props.handleChange('type','genius')}
          >牛人</RadioItem>
          <RadioItem
            checked={this.props.state.type==='boss'}
            onChange={()=>this.props.handleChange('type','boss')}
          >BOSS</RadioItem>
          <WhiteSpace/>
        </List>
        <WingBlank>
          <Button onClick={this.handleRegister} type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register


import React from 'react'
import './logo.css'
class Logo extends React.Component{

  render(){
    return (
      <div className='logo-container'>
        <img src={require('./logo.png')} alt="" />
      </div>
    )
  }
}

export default Logo
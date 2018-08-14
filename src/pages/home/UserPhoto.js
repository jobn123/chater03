import React from 'react'
import axios from "axios/index"

class UserPhoto extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount(){
    let url = 'http://123.56.14.124:918/compare/?format=json&target=profile&id=423,910,788'

    axios.get(url)
    .then(res => {
      this.setState({data: res.data.data.data})
    }).catch(err =>{
      console.log(err)
    })
  }
  
  render(){
    return ( 
      <div>
        用户画像
      </div>
    )
  }
}

export default UserPhoto



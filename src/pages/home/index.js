import React from 'react'
import axios from "axios/index"
import { SearchBar } from 'antd-mobile'
import './index.css'

class Home extends React.Component{
  constructor() {
    super()
    this.state = {
      value: "",
      searchflag: false,
      searchResults: []
    }
  }
  componentDidMount(){
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
  clear = () => {
    this.setState({ value: '' });
  };
  search(val) {
    if(val === "") {
      return this.setState({searchResults: []})
    }

    axios.get(`http://123.56.14.124:918/albums/?format=json&search=${val}&page_size=50`)
    .then(res=>{
      if(res.status===200){
        this.setState({
          searchResults: res.data.results,
        });
      }
    })
  }
  renderHomeBody() {
    let { searchflag, searchResults } = this.state
    if (searchResults.length === 0) {
      return (<div>
        <p>请选择右上角『+』按钮创影片建对比组</p>
          <div className="home-bg"> </div>
      </div>)
    } else {
      return(
        <div>chengquan</div>
      )
    }
  }
  render(){
    return (
      <div>
          <div className="header">
            首页
          </div>

          <div className="home-content">
          <SearchBar
            className="home-saerch"
            value={this.state.value}
            placeholder="搜索影片名"
            onSubmit={value => this.search(value)}
            onFocus={() => console.log('onFocus')}
            onBlur={() => console.log('onBlur')}
            showCancelButton = {true}
            cancelText=""
            onChange={this.onChange}
          />
          {this.renderHomeBody()}
          </div>
      </div>
    )
  }
}

export default Home
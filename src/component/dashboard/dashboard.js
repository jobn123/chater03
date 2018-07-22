import React from 'react'
import {Menu, ActivityIndicator, NavBar,Icon, SearchBar, List, Card} from 'antd-mobile'
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
// import NavLinkBar from "../navlink/navlink"
// import Boss from '../../component/boss/boss'
// import Genius from '../../component/genius/genius'
// import User from '../../component/user/user'
import Search from '../../component/search'
import TabExample from "../boss/tabExample"
import TabNumber from "../boss/tabNumber"
import TabCustom from "../boss/tabCustom"
import Videos from "../boss/videos"
import axios from "axios/index";
import {getUserList} from "../../redux/chatuser.redux";

const data = [
  {
    value: '1',
    label: '营销榜',
    path:'/boss',
  }, {
    value: '2',
    label: '热度榜',
    path:'/genius',
  },
  {
    value: '3',
    label: '视频榜',
    path:'/video',
  },
  {
    value: '4',
    label: '自选榜',
    path:'/msg',
  },
];

@connect(
  state=>state.chatuser,
  {getUserList}
)
class Dashboard extends React.Component{
  constructor(...args) {
    super(...args);
    this.state = {
      initData: '',
      show: false,
      value:'1',
      open: false,
      initData1: '',
      valueRight:null,
      searchView: false,
      searchResults: [],
      searchResultView: false,
      searchContent: {}
    };
  }
  componentDidMount() {
    // this.autoFocusInst.focus();
  }
  onChange = (value) => {
    let label = '';
    data.forEach((dataItem) => {
      if (dataItem.value === value[0]) {
        label = dataItem.label;
        // console.log(this.props);
        this.setState({ show: false,value:dataItem.value });
        this.props.history.push(dataItem.path);
      }
    });
    // console.log(label);
  }
  handleClick = (e) => {
    e.preventDefault(); // Fix event propagation on Android
    this.setState({
      show: !this.state.show,
      searchView: false
    });
    // mock for async data loading
    if (!this.state.initData) {
      this.setState({
        initData: data,
      });
    }
  }

  onOk = (value) => {
    // console.log("onOk");
    this.setState({ open: false,valueRight:value });
    this.props.getUserList(value,"wish_count")
    // this.forceUpdate()
  }

  onCancel = () => {
    this.setState({ open: false });
  }

  handleRightClick = (e) => {
    e.preventDefault(); // Fix event propagation on Android
    this.setState({
      open: !this.state.open,
    });


    //http://localhost:918/titles/?format=json&page_size=50
    if (!this.state.initData1) {
      axios.get('http://123.56.14.124:918/titles/?format=json&page_size=50&target=wish_count')
        .then(res=>{
          if(res.status===200){
            this.setState({
              initData1: res.data.results,
            });
          }
        })
    }
  }
  showSearchNav = () => {
    this.setState({
      searchView: !this.state.searchView,
      searchResults: []
    })
  }
  showSearchDetail = (desc) => {
    this.setState({
      searchResultView: true,
      searchContent: desc
    })
  }
  /**
   * handle search click
   */
  handleSearchClick = (e) => {
    // this.props.history.push('/search')
    // console.log(this)
    if(e === "") {
      return this.setState({searchResults: []})
    }

    axios.get(`http://123.56.14.124:918/albums/?format=json&search=${e}&page_size=50`)
    .then(res=>{
      if(res.status===200){
        this.setState({
          searchResults: res.data.results,
        });
      }
    })
  }
  searchPlus = (e) => {
    if(e === "") {
      return this.setState({initData1: []})
    }
    axios.get(`http://123.56.14.124:918/albums/?format=json&search=${e}&page_size=50`)
    .then(res=>{
      if(res.status===200){
        let data = res.data.results
        let arr = []

        for (let i = 0; i < data.length; i++ ) {
          let item = data[i]
          let obj = {
            label: item.title,
            value: item.pid
          }
          arr.push(obj)
        }

        this.setState({
          initData1: arr,
        });
      }
    })
  }
  onMaskClick = () => {
    this.setState({
      show: false,
    });
  }

  onMaskClick1 = () => {
    this.setState({
      open: false,
    });
  }
  renderSearchView = () => {
    const clientH = document.body.clientHeight;
    const {searchView, searchResults} = this.state
    if(!searchView) { return null }
    const searchCon = (
        <SearchBar placeholder="输入片名、主演或导演" 
          onChange={this.handleSearchClick} 
          showCancelButton
          onCancel={this.showSearchNav}
          onClear={value => console.log(value, 'onClear')}
        />
    );
    const lists = []
    const Item = List.Item
    if (searchResults.length > 0) {
      for(var i=0; i<searchResults.length; i++) {
        // debugger
        const spa = searchResults[i]
        const litem = <Item 
          onClick={(i)=> {this.showSearchDetail(spa)}}>
          {spa.title}
        </Item>
        lists.push(litem)
      }
    } 
    return (
      <div style={{position: 'absolute', zIndex: '99', top: 45, height: clientH,
      width: '100%',background: 'white'}}>
        {searchCon}
        <List>
          {lists}
        </List>
      </div>
    )
  }
  renderSearchViewResult = () => {
    const { searchResultView, searchContent } = this.state
    if (!searchResultView) return null
    const cH = document.getElementsByClassName('am-list')[0].clientHeight + 90
    return (
      < div style={{position: 'absolute',top: 0,zIndex: 100,width: '100%',height: cH,background: 'white'}}>
        <div style={{position: 'relative', top: 8}}>
        <Icon type="left" 
          color="white"
          size="lg"
          onClick={()=> this.setState({
          searchResultView: false})}/></div>
          <div style={{background: '#151515', position: 'absolute', top: 0, zIndex: -1, width: '100%'}}>
          <div style={{textAlign: 'center', marginTop: 16}}>
            <div style={{fontSize: 24,color: "#E3E3E3",marginBottom: 4}}> 
              {searchContent.title} 
            </div>
            <div style={{fontSize: 14,color: "#FFFFFF"}}> 
              {searchContent.original_title} 
            </div>
          </div>
  
          <div style={{fontSize: 14,color: "#E3E3E3", width: 335, margin:"18px auto 0 auto"}}>
            <div style={{marginBottom: 10}}>
              <span>上映时间：</span>
              <span style={{color: 'rgb(207,87,76)'}}>{searchContent.show_time}</span> 
            </div>
            <div style={{marginBottom: 10}}>
              <span>导演：</span>
              <span>{searchContent.director}</span>
            </div>
            <div style={{marginBottom: 10}}>
              <span>演员：</span>
              <span>{searchContent.cast.replace(/,/g, '/')}</span>
            </div>
          </div>
          <div style={{background: "white", paddingTop: 1}}>
          <div style={{width: 335, margin: "12px auto 0 auto",background: "#F5F5F5", borderRadius: 2}}>
            <div style={{margin:"0 0 10px 20px",paddingTop: 12}}>评分</div>
            <ul style={{paddingLeft: 20}}>
              <li style={{width: '51%', display: 'inline-block', marginBottom:6}}>
                <span>猫眼评分：</span>
                <span style={{color: "rgb(226,112,100)"}}>{searchContent.rating}</span>
              </li>
              <li style={{width: '49%', display: 'inline-block', marginBottom:6}}>
                <span>淘票票评分：</span>
                <span style={{color: "rgb(226,112,100)"}}>{searchContent.taopiaopiao_rating}</span></li>
              <li style={{width: '51%', display: 'inline-block', marginBottom:6}}>
                <span>豆瓣评分：</span>
                <span style={{color: "rgb(226,112,100)"}}>
                {searchContent.douban_rating}
                </span></li>
              <li style={{width: '49%', display: 'inline-block', marginBottom:6}}>
                <span>时光网评分：</span>
                <span style={{color: "rgb(226,112,100)"}}>{searchContent.mtime_rating}</span></li>
              <li style={{width: '51%', display: 'inline-block', marginBottom:16}}>
                <span>微博评分：</span>
                <span style={{color: "rgb(226,112,100)"}}>{searchContent.weibo_rating}</span></li>
            </ul>
          </div>
          <div style={{width: 335, margin: "12px auto 0 auto", background: "#F5F5F5", borderRadius: 2}}>
            <div style={{margin:"0 0 10px 20px",paddingTop: 12}}>想看人数</div>
            <ul style={{paddingLeft: 20}}>
              <li style={{width: '51%', display: 'inline-block', marginBottom:6}}>
                <span>猫眼想看：</span>
                <span style={{color: "rgb(226,112,100)"}}>{searchContent.wish_count}</span>
              </li>
              <li style={{width: '49%', display: 'inline-block', marginBottom:6}}>
                <span>淘票票想看：</span>
                <span style={{color: "rgb(226,112,100)"}}>{searchContent.taopiaopiao_wish_count}</span></li>
              <li style={{width: '51%', display: 'inline-block', marginBottom:6}}>
                <span>豆瓣想看：</span>
                <span style={{color: "rgb(226,112,100)"}}>
                {searchContent.douban_wish_count}
                </span></li>
              <li style={{width: '49%', display: 'inline-block', marginBottom:6}}>
                <span>时光网想看：</span>
                <span style={{color: "rgb(226,112,100)"}}>{searchContent.mtime_wish_count}</span></li>
              <li style={{width: '51%', display: 'inline-block', marginBottom:16}}>
                <span>微博想看：</span>
                <span style={{color: "rgb(226,112,100)"}}>{searchContent.weibo_wish_count}</span></li>
            </ul>
          </div>
          <div style={{width: 335, margin: "12px auto 0 auto",background: "#F5F5F5", borderRadius: 2}}>
            <div style={{margin:"0 0 10px 20px",paddingTop: 12}}>指数</div>
            <ul style={{paddingLeft: 20}}>
              <li style={{width: '51%', display: 'inline-block', marginBottom:6}}>
                <span>微信指数：</span>
                <span style={{color: "rgb(226,112,100)"}}>{searchContent.weixin_index}</span>
              </li>
              <li style={{width: '49%', display: 'inline-block', marginBottom:6}}>
                <span>微博指数：</span>
                <span style={{color: "rgb(226,112,100)"}}>{searchContent.weixin_index}</span></li>
              <li style={{width: '51%', display: 'inline-block', marginBottom:16}}>
                <span>百度指数：</span>
                <span style={{color: "rgb(226,112,100)"}}>
                {searchContent.baidu_index}
                </span></li>
            </ul>
          </div>
          <div style={{width: 335, margin: "12px auto 0 auto", background: "#F5F5F5", borderRadius: 2}}>
            <div style={{margin:"0 0 10px 20px",paddingTop: 12}}>其他</div>
            <ul style={{paddingLeft: 20}}>
              <li style={{width: '51%', display: 'inline-block', marginBottom:6}}>
                <span>微博阅读数：</span>
                <span style={{color: "rgb(226,112,100)"}}>{Math.ceil(searchContent.weibo_view_count / 10000)} 万</span>
              </li>
              <li style={{width: '49%', display: 'inline-block', marginBottom:6}}>
                <span>微博讨论数：</span>
                <span style={{color: "rgb(226,112,100)"}}>{Math.ceil(searchContent.weibo_discuss_count / 10000)} 万</span></li>
            </ul>
          </div>
          </div>
        </div>
        
      </div>
    )
  }
  menuChange = (item) => {
    console.log(this.state.valueRight)
    return false
  }
  render(){
    const { pathname } = this.props.location
    const { initData, show, initData1, open, searchView } = this.state
    const clientH = document.body.clientHeight - 50;
    const menuEl1 = (
      <div>
      <SearchBar placeholder="Search" onChange={this.searchPlus} style={{zIndex: 100}}/> 
      <Menu
        className="single-multi-foo-menu"
        data={initData1}
        value={this.state.valueRight}
        level={1}
        onClick={this.menuChange}
        onOk={this.onOk}
        onCancel={this.onCancel}
        height={550}
        multiSelect
      />
      </div>
    );
    
    const loadingEl1 = (
      <div style={{ position: 'absolute', width: '100%', height: 500, display: 'flex', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </div>
    );
    const menuEl = (
      <Menu
        onClick={()=>{alert('ddd')}}
        className="single-foo-menu"
        data={initData}
        value={[this.state.value]}
        level={1}
        onChange={this.onChange}
        height={500}
      />
    );
    const loadingEl = (
      <div style={{ position: 'absolute', width: '100%', height: 500, display: 'flex', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </div>
    );
    const navList =[
      {
        path:'/boss',
        text:'营销榜',
        icon:'boss',
        title:'营销榜单',
        component:TabExample,
        // hide:user.type==='genius'
      },
      {
        path:'/genius',
        text:'热度榜',
        icon:'job',
        title:'热度榜单',
        component:TabNumber,
        // hide:user.type==='boss'
      },
      {
        path:'/video',
        text:'视频榜',
        icon:'msg',
        title:'视频榜单',
        component:Videos,
      },
      {
        path:'/msg',
        text:'自选榜',
        icon:'msg',
        title:'自选榜单',
        component:TabCustom,
      },
      {
        path:'/search',
        text:'搜索',
        icon:'search',
        title:'自选榜单',
        component:Search,
      },
    ]

    return (
      <div className={show ? 'single-menu-active' : 'single-multi-menu-active'}>
        <div>
          {/*<NavBar className='fixed-header' mode='dark'>*/}
          <NavBar
            mode="dark"
            icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg" className="am-icon am-icon-md" alt="" />}
            onLeftClick={this.handleClick}
            // rightContent={<b onClick={() => this.setState({ open: true })}>...</b>}
            rightContent={pathname==="/msg"?[
              <Icon key="0" type="plus" onClick={this.handleRightClick} />
            ]:<Icon key="0" type="search" onClick={this.showSearchNav}/>}
            className="single-top-nav-bar">
              {data.find(v=>v.value===this.state.value).label}
              {/*{navList.find(v=>v.path===pathname).title}*/}
            </NavBar>
        </div>
        {show ? initData ? menuEl : loadingEl : null}
        {/* {searchView ? searchCon : null} */}
        {this.renderSearchView()}
        {this.renderSearchViewResult()}
        {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
        {open ? initData1 ? menuEl1 : loadingEl1 : null}
        {open ? <div className="menu-mask" onClick={this.onMaskClick1} /> : null}
        <div style={{marginTop:0}}>
          <Switch>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component} />
            ))}
          </Switch>
          {this.props.location.pathname==="/" ? <TabExample /> : null}
        </div>
        {/*<NavLinkBar data={navList}/>*/}
      </div>
    )
  }
}

export default Dashboard

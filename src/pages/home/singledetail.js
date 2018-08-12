import React from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid} from 'recharts'
import axios from 'axios'

class SingleDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showItem1: false,
      showItem2: false,
      showItem3: false,
      showItem4: false,
      showItem5: false,
      showItem6: false,
      data: null
    }
  }
  componentDidMount() {
    let { aid } = this.props
    let url = `http://123.56.14.124:918/albums/${aid}/?format=json`

    axios.get(url).then((res) => {
      this.setState({
        data: res.data
      })
    })
  }
  render() {
    let { showItem1, showItem2, showItem3, showItem4, showItem5, showItem6, data } = this.state
    if (data === null) {
      return (<div></div>)
    }
    let dl = data
    let m_M = dl.maoyan_M.toFixed(2) * 100 + "%"
    let m_F = dl.maoyan_F.toFixed(2) * 100 + "%"
    let t_M = dl.tpp_M.toFixed(2) * 100 + "%"
    let t_F = dl.tpp_F.toFixed(2) * 100 + "%"

    let cw = document.body.clientWidth - 30

    const data2 = [{
      name: '20岁以下', my: dl.maoyan_0_19 * 100, tpp: dl.tpp_0_19 * 100
    },{
      name: '20-24', my: dl.maoyan_20_24 * 100, tpp: dl.tpp_20_24 * 100
    },{
      name: '25-29', my: dl.maoyan_25_29 * 100, tpp: dl.tpp_25_29* 100
    },{
      name: '30-34', my: dl.maoyan_30_34 * 100, tpp: dl.tpp_30_34* 100
    },{
      name: '35-39', my: dl.maoyan_35_39 * 100, tpp: dl.tpp_35_39* 100
    },{
      name: '40岁以上', my: dl.maoyan_40_100 * 100, tpp: dl.tpp_40_100* 100
    }]

    const data3 = [{
      tppc: '一线城市', tppv: dl.tpp_city1 * 100
    },{
      tppc: '二线城市', tppv: dl.tpp_city2 * 100
    },{
      tppc: '三线城市', tppv: dl.tpp_city3 * 100
    },{
      tppc: '四线城市', tppv: dl.tpp_city4 * 100
    }]
    return (
      <div className="singleDetail">
          <div className="singleDetail_title">
          <span style={{float: 'left', marginLeft:'9px'}}onClick={()=>{this.setState({showSingleFlag: false})}}>返回</span>
          <span>{dl.title}</span></div>
          <div className="singleDetail_sub">{dl.show_time}上映</div>

          <div className="single-wanted" ref="wanted">
            <div className={showItem1 ? "wanted-title_up" : "wanted-title"}>
              <span>想看</span><span className={showItem1 ? "up-pic" : "down-pic"} onClick={()=>{this.setState({
    showItem1: !this.state.showItem1})}}></span></div>
            <div ref="wanted-body" style={{display: showItem1 ? 'block' : 'none'}}>
            <div className="wanted-item_t"><span>观测指标</span><span>当前值</span><span>变化值</span><span>日环比</span></div>
            <div className="wanted-item"><span className="st1">猫眼</span><span>{dl.maoyan_wish_count}</span><span>{dl.maoyan_wish_up}</span><span>{dl.maoyan_wish_percent}</span></div>
            <div className="wanted-item"><span className="st2">淘票票</span><span>{dl.tpp_wish_count}</span><span>{dl.tpp_wish_up}</span><span>{dl.tpp_wish_percent}</span></div>
            <div className="wanted-item"><span className="st3">微博</span><span>{dl.weibo_wish_count}</span><span>{dl.weibo_wish_up}</span><span>{dl.weibo_wish_percent}</span></div>
            <div className="wanted-item"><span className="st4">微信</span><span>{dl.weixin_index_count}</span><span>{dl.weixin_index_up}</span><span>{dl.weixin_index_percent}</span></div>
          </div></div>

          <div className="single-wanted">
            <div className={showItem2 ? "wanted-title_up" : "wanted-title"}><span>热度</span><span className={showItem2 ? "up-pic" : "down-pic"} onClick={()=>{this.setState({
    showItem2: !this.state.showItem2})}}></span></div>
            <div ref="hot-body" style={{display: showItem2 ? 'block' : 'none'}}>
            <div className="hot-item_t"><span>观测指标</span><span>当前值</span><span>日环比</span></div>
            <div className="wanted-item"><span className="ht1">百度</span><span>{dl.baidu_index_count}</span><span>{dl.baidu_index_up}</span><span>{dl.baidu_index_percent}</span></div>
            <div className="wanted-item"><span className="st3">微博</span><span>{dl.weibo_wish_count}</span><span>{dl.weibo_wish_up}</span><span>{dl.weibo_wish_percent}</span></div>
            <div className="wanted-item"><span className="ht3">阅读</span><span>{dl.weibo_view_count}</span><span>{dl.weibo_view_up}</span><span>{dl.weibo_view_percent}</span></div>
            <div className="wanted-item"><span className="ht4">讨论</span><span>{dl.weibo_discuss_count}</span><span>{dl.weibo_discuss_up}</span><span>{dl.weibo_discuss_percent}</span></div>
            <div className="wanted-item"><span className="st4">微信</span><span>{dl.weixin_index_count}</span><span>{dl.weixin_index_up}</span><span>{dl.weixin_index_percent}</span></div>
            <div className="wanted-item"><span className="ht6">豆瓣</span><span>{dl.douban_wish_count}</span><span>{dl.douban_wish_up}</span><span>{dl.douban_wish_percent}</span></div></div>
          </div>
              
          <div className="single-wanted">
            <div className={showItem3 ? "wanted-title_up" : "wanted-title"}><span>物料</span><span className={showItem3 ? "up-pic" : "down-pic"} onClick={()=>{this.setState({
    showItem3: !this.state.showItem3})}}></span><span style={{display: showItem3 ? 'block' : 'none'}} className="checkHistory" onClick={()=>{this.showHistory(true)}}>查看历史</span></div>
            <div ref="mate-body" style={{display: showItem3 ? 'block' : 'none'}}>
            <div className="wanted-item_t"><span>观测指标</span><span>当前值</span><span>增量值</span><span>日环比</span></div>
            <div className="wanted-item"><span className="wt1">总播放</span><span>{dl.play_total_count}</span><span>{dl.play_total_up}</span><span>{dl.play_total_percent}</span></div>
            <div className="wanted-item"><span className="wt2">腾讯</span><span>{dl.play_qq_count}</span><span>{dl.play_qq_up}</span><span>{dl.play_qq_percent
}</span></div>
            <div className="wanted-item"><span className="wt3">优酷</span><span>{dl.play_youku_count}</span>{dl.play_youku_up}<span></span><span>{dl.play_youku_percent}</span></div>
            <div className="wanted-item"><span className="wt4">爱奇艺</span><span>{dl.play_iqiyi_count}</span><span>{dl.play_iqiyi_up}</span><span>{dl.play_iqiyi_percent
}</span></div>
            <div className="wanted-item"><span className="wt5">秒拍</span><span>{dl.play_miaopai_count}</span><span>{dl.play_miaopai_up}</span><span>{dl.play_miaopai_percent}</span></div>
            </div>
          </div>

          <div className="single-wanted">
            <div className={showItem4 ? "wanted-title_up" : "wanted-title"}><span>预售</span><span className={showItem4 ? "up-pic" : "down-pic"} onClick={()=>{this.setState({
    showItem4: !this.state.showItem4})}}></span></div>
            <div ref="sale-body" style={{display: showItem4 ? 'block' : 'none'}}>
            <div className="wanted-item_t"><span>观测指标</span><span>当前值</span><span>昨日值</span><span>日环比</span></div>
            <div className="wanted-item">
              <span>零点场</span>
              <span>{dl.zero_box_count}</span>
              <span>{dl.zero_box_up}</span>
              <span>{dl.zero_box_percent}</span>
            </div>
            <div className="wanted-item"><span>首日票房</span>
            <span>{dl.first_box_count}</span>
            <span>{dl.first_box_up}</span>
            <span>{dl.first_box_percent}</span></div>
            <div className="wanted-item"><span>首日排片</span><span>{dl.first_num_percent_count}</span><span>{dl.first_num_percent_up}</span><span>{dl.first_num_percent_percent}</span></div>
            <div className="wanted-item"><span>首日场次</span><span>{dl.first_num_count}</span><span>{dl.first_num_percent_count}</span><span>{dl.first_num_percent}</span></div>
            <div className="wanted-item"><span>大盘场次</span><span>{dl.first_num_total_count}</span><span>{dl.first_num_total_up}</span><span>{dl.first_num_total_percent}</span></div></div>
          </div>

          <div className="single-wanted">
            <div className={showItem5 ? "wanted-title_up" : "wanted-title"}><span>口碑</span><span className={showItem5 ? "up-pic" : "down-pic"} onClick={()=>{this.setState({
    showItem5: !this.state.showItem5})}}></span></div>
            <div ref="kb-body" style={{display: showItem5 ? 'block' : 'none'}}>
            <div className="kb-item_t"><span className="st2">淘票票  {dl.taopiaopiao_rating}</span><span className="st1">猫眼  {dl.rating}</span><span className="st3">微博大V推荐  {dl.weibo_v_rating}</span><span className="itime">时光网  {dl.mtime_rating}</span><span className="ht6">豆瓣  {dl.douban_rating}</span><span className="st2">微博好评率  {dl.weibo_rating}</span></div></div>
          </div>
          
          <div className="single-wanted">
            <div className={showItem6 ? "wanted-title_up" : "wanted-title"}><span>用户画像</span><span className={showItem6 ? "up-pic" : "down-pic"} onClick={()=>{this.setState({
    showItem6: !this.state.showItem6})}}></span></div>
            <div ref="user-body" style={{display: showItem6 ? 'block' : 'none'}}>
            <div className="user-sex">
              <p style={{fontSize: '14px',marginTop: '24px', marginBottom: '36px'}}>受众性别</p>
              <div className="user-sex_div">
                <div style={{width: '15%', display: 'inline-block'}}><span>猫眼</span></div>
                <div style={{width: '75%', display: 'inline-block'}}><span className="sex-my-male" style={{width: m_M}}><span className="m_tip">男 {m_M}</span></span>
                <span className="sex-my-female" style={{width: m_F}}><span className="f_tip">女 {m_F}</span></span></div>
              </div>
              <div className="user-sex_div">
              <div style={{width: '15%', display: 'inline-block'}}><span>淘票票</span></div>
                <div style={{width: '75%', display: 'inline-block'}}><span className="sex-my-male" style={{width: t_M}}><span className="m_tip">男 {t_M}</span></span>
                <span className="sex-my-female" style={{width: t_F}}><span className="f_tip">女 {t_F}</span></span></div>
              </div>
            </div>

            <div className="user-age">
              <p style={{fontSize: '14px',marginTop: '24px', marginBottom: '16px'}}>年龄分布(单位：%)</p>
              <BarChart width={cw} height={161} data={data2}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name"/>
              <YAxis/>
              {/* <Tooltip/> */}
              {/* <Legend /> */}
              <Bar dataKey="my" fill="#FF574D" barSize={10}/>
              <Bar dataKey="tpp" fill="#108EE9" barSize={10}/>
              </BarChart>
            </div>
            
            <div className="user-area">
              <p style={{fontSize: '14px',marginTop: '24px', marginBottom: '16px'}}>淘票票地域分布(单位：%)</p>
              <BarChart width={cw} height={161} data={data3}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="tppc" stroke="#8884d8"/>
              <YAxis/>
              <Bar dataKey="tppv" fill="#FF574D" barSize={10}/>
              </BarChart>
            </div>
            </div>
          </div>
      </div>
    )
  }
}

export default SingleDetail
import React from "react";
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import Genius from '../genius/genius'

function renderTabBar(props) {
  return (<Sticky>
    {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
  </Sticky>);
}
const tabs = [
  { title: '猫眼想看',target:'maoyan_wish_count' },
  { title: '豆瓣想看',target:'douban_wish_count'  },
  { title: '时光网想看',target:'mtime_wish_count'  },
  { title: '微博想看',target:'weibo_wish_count'  },
  { title: '淘票票想看',target:'taopiaopiao_wish_count'  },
  { title: '微博阅读', target: 'weibo_view_count' },
  { title: '微博讨论', target: 'weibo_discuss_count' },
  { title: '百度指数', target: 'baidu_index' },
  { title: '微博指数', target: 'weibo_index' },
  { title: '微信指数', target: 'weixin_index' },
  { title: '播放总量', target: 'play_total_count' },
  { title: '秒拍', target: 'play_weipai_count' },
  { title: '爱奇艺', target: 'play_iqiyi_count' },
  { title: '腾讯', target: 'play_qq_count' },
  { title: '优酷', target: 'play_youku_count' },
];

class TabCustom extends React.Component {
  constructor() {
    super()

    this.state = {
      tabIndex: 0
    }
  }
  renderContent = () => {
    let {tabIndex} = this.state 
    let tar = tabs[tabIndex].target
    return (
      <div>
              <WhiteSpace />
              <Genius platform={tar} hot="value" coming="value"/>
            </div>
    )
  }
  render () {
    return (
      <div>
        {console.log("TabCustom")}
        {console.log(this.props)}
        <StickyContainer>
          <Tabs tabs={tabs}
                swipeable={false}
                useOnPan={false}
                prerenderingSiblingsNumber={0}
                renderTabBar={renderTabBar}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { this.setState({tabIndex: index})}}
          >
          </Tabs>
          {this.renderContent()}
        </StickyContainer>
        <WhiteSpace />
      </div>
      )
  }
}

export default TabCustom
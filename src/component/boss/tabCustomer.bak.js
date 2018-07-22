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
  { title: '微博阅读' },
  { title: '微博讨论' },
  { title: '百度指数' },
  { title: '微博指数' },
  { title: '微信指数' },
];

const TabCustom = () => (
  <div>
    {console.log("TabCustom")}
    {console.log(this.props)}
    <StickyContainer>
      <Tabs tabs={tabs}
            initialPage={true}
            swipeable={false}
            useOnPan={false}
            prerenderingSiblingsNumber={0}
            renderTabBar={renderTabBar}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
      >
        <div>
          <WhiteSpace />
          <Genius platform="maoyan_wish_count" hot="up" coming="up" />
        </div>
        <div>
          <WhiteSpace />
          <Genius platform="douban_wish_count" hot="up" coming="up"/>
        </div>
        <div>
          <WhiteSpace />
          <Genius platform="mtime_wish_count" hot="up" coming="up"/>
        </div>
        <div>
          <WhiteSpace />
          <Genius platform="weibo_wish_count" hot="up" coming="up"/>
        </div>
        <div>
          <WhiteSpace />
          <Genius platform="taopiaopiao_wish_count" hot="up" coming="up"/>
        </div>
        <div>
          <WhiteSpace />
          <Genius platform="weibo_view_count" hot="up" coming="up"/>
        </div>
        <div>
          <WhiteSpace />
          <Genius platform="weibo_discuss_count" hot="up" coming="up"/>
        </div>
        <div>
          <WhiteSpace />
          <Genius platform="baidu_index" hot="value" coming="value"/>
        </div>
        <div>
          <WhiteSpace />
          <Genius platform="weibo_index" hot="value" coming="value"/>
        </div>
        <div>
          <WhiteSpace />
          <Genius platform="weixin_index" hot="value" coming="value"/>
        </div>
      </Tabs>
    </StickyContainer>
    <WhiteSpace />
  </div>
);

export default TabCustom
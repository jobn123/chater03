import React from "react";
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import Boss from './boss'

function renderTabBar(props) {
  return (<Sticky>
    {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
  </Sticky>);
}
const tabs = [
  { title: '微信指数' },
  { title: '百度指数' },
  { title: '微博指数' },
  { title: '微博阅读' },
  { title: '微博讨论' },
];

const TabNumber = () => (
  <div>
    <StickyContainer>
      <Tabs tabs={tabs}
            prerenderingSiblingsNumber={0}
            swipeable={false}
            useOnPan={false}
            renderTabBar={renderTabBar}
      >
        <div>
          <WhiteSpace />
          <Boss platform="weixin_index" hot="weixin_index" coming="weixin_index"/>
        </div>
        <div>
          <WhiteSpace />
          <Boss platform="baidu_index" hot="baidu_index" coming="baidu_index"/>
        </div>
        <div>
          <WhiteSpace />
          <Boss platform="weibo_index" hot="weibo_index" coming="weibo_index"/>
        </div>
        <div>
          <WhiteSpace />
          <Boss platform="weibo_view_count" hot="weibo_view_count" coming="weibo_view_count"/>
        </div>
        <div>
          <WhiteSpace />
          <Boss platform="weibo_discuss_count" hot="weibo_discuss_count" coming="weibo_discuss_count"/>
        </div>
      </Tabs>
    </StickyContainer>
    <WhiteSpace />
  </div>
);

export default TabNumber
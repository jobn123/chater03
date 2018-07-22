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
  { title: '总量' },
  { title: '腾讯' },
  { title: '爱奇艺' },
  { title: '优酷' },
  { title: '秒拍' },
];

const Videos = () => (
  <div>
    <StickyContainer>
      <Tabs tabs={tabs}
            prerenderingSiblingsNumber={0}
            swipeable={false}
            useOnPan={false}
            renderTabBar={renderTabBar}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
      >
        <div>
          <WhiteSpace />
          <Boss platform="total" hot="play_total_count" coming="play_total_up"/>
        </div>
        <div>
          <WhiteSpace />
          <Boss platform="qq" hot="play_qq_up" coming="play_qq_count"/>
        </div>
        <div>
          <WhiteSpace />
          <Boss platform="iqiyi" hot="play_iqiyi_up" coming="play_iqiyi_count"/>
        </div>
        <div>
          <WhiteSpace />
          <Boss platform="youku" hot="play_youku_up" coming="play_youku_count"/>
        </div>
        <div>
          <WhiteSpace />
          <Boss platform="weipai" hot="play_weipai_up" coming="play_weipai_count"/>
        </div>
      </Tabs>
    </StickyContainer>
    <WhiteSpace />
  </div>
);

export default Videos
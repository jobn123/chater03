// import React from "react";
// import { Tabs, WhiteSpace } from 'antd-mobile';
// import { StickyContainer, Sticky } from 'react-sticky';
// import Boss from './boss'

// function renderTabBar(props) {
//   return (<Sticky>
//     {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
//   </Sticky>);
// }
// const tabs = [
//   { title: '猫眼' },
//   { title: '淘票票' },
//   { title: '豆瓣' },
//   { title: '时光网' },
//   { title: '微博' },
// ];

// const TabExample = () => (
//   <div>
//     <StickyContainer>
//       <Tabs tabs={tabs}
//             prerenderingSiblingsNumber={0}
//             swipeable={false}
//             useOnPan={false}
//             renderTabBar={renderTabBar}
//             // onChange={(tab, index) => { console.log('onChange', index, tab); }}
//             // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
//       >
//         <div>
//           <WhiteSpace />
//           <Boss platform="maoyan" hot="rating" coming="wish_count"/>
//         </div>
//         <div>
//           <WhiteSpace />
//           <Boss platform="taopiaopiao" hot="taopiaopiao_rating" coming="taopiaopiao_wish_count"/>
//         </div>
//         <div>
//           <WhiteSpace />
//           <Boss platform="douban" hot="douban_rating" coming="douban_wish_count"/>
//         </div>
//         <div>
//           <WhiteSpace />
//           <Boss platform="mtime" hot="mtime_rating" coming="mtime_wish_count"/>
//         </div>
//         <div>
//           <WhiteSpace />
//           <Boss platform="weibo" hot="weibo_rating" coming="weibo_wish_count"/>
//         </div>
//       </Tabs>
//     </StickyContainer>
//     <WhiteSpace />
//   </div>
// );

// export default TabExample



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
  { title: '猫眼' },
  { title: '淘票票' },
  { title: '豆瓣' },
  { title: '时光网' },
  { title: '微博' },
];

const TabExample = () => (
  <div>
    <StickyContainer>
      <Tabs tabs={tabs}
            prerenderingSiblingsNumber={0}
            swipeable={false}
            useOnPan={false}
            renderTabBar={renderTabBar}
      >
        <div className="yyyy">
          <WhiteSpace />
          <Boss platform="maoyan" hot="rating" coming="wish_count"/>
        </div>
        <div>
          <WhiteSpace />
          <Boss platform="taopiaopiao" hot="taopiaopiao_rating" coming="taopiaopiao_wish_count"/>
        </div>
        <div>
          <WhiteSpace />
          <Boss platform="douban" hot="douban_rating" coming="douban_wish_count"/>
        </div>
        <div>
          <WhiteSpace />
          <Boss platform="mtime" hot="mtime_rating" coming="mtime_wish_count"/>
        </div>
        <div>
          <WhiteSpace />
          <Boss platform="weibo" hot="weibo_rating" coming="weibo_wish_count"/>
        </div>
      </Tabs>
    </StickyContainer>
    <WhiteSpace />
  </div>
);

export default TabExample

// import React from "react";
// import { Tabs, WhiteSpace } from 'antd-mobile';
// import { StickyContainer, Sticky } from 'react-sticky';
// import Boss from './boss'

// function renderTabBar(props) {
//   return (<Sticky>
//     {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
//   </Sticky>);
// }
// const tabs = [
//   { title: '猫眼',target:'maoyan', hot: 'rating', coming: 'wish_count' },
//   { title: '淘票票',target:'taopiaopiao', hot: 'taopiaopiao_rating', coming: 'taopiaopiao_wish_count'  },
//   { title: '豆瓣',target:'douban', hot: 'douban_rating', coming: 'douban_wish_count' },
//   { title: '微博',target:'weibo', hot: 'weibo_rating', coming: 'weibo_wish_count' }
// ];

// class TabExample extends React.Component {
//   constructor() {
//     super()

//     this.state = {
//       tabIndex: 0
//     }
//   }
//   renderContent = () => {
//     let {tabIndex} = this.state 
//     let tar = tabs[tabIndex].target
//     let rating = tabs[tabIndex].hot
//     let coming = tabs[tabIndex].coming

//     return (
//       <div>
//               <WhiteSpace />
//               <Boss platform={tar} hot={rating} coming={coming}/>
//               {/* <Genius platform={tar} hot="value" coming="value"/> */}
//             </div>
//     )
//   }
//   render () {
//     return (
//       <div>
//         {console.log("TabCustom")}
//         {console.log(this.props)}
//         <StickyContainer>
//           <Tabs tabs={tabs}
//                 swipeable={false}
//                 useOnPan={false}
//                 prerenderingSiblingsNumber={0}
//                 renderTabBar={renderTabBar}
//                 onChange={(tab, index) => { console.log('onChange', index, tab); }}
//                 onTabClick={(tab, index) => { this.setState({tabIndex: index})}}
//           >
//           </Tabs>
//           {this.renderContent()}
//         </StickyContainer>
//         <WhiteSpace />
//       </div>
//       )
//   }
// }

// export default TabExample
import React from "react";
// import { render } from "react-dom";
// import { makeData, Logo, Tips } from "../../Utils";

// // Import React Table
// import _ from "lodash";
// import ReactTable from "react-table";
// import "react-table/react-table.css";

import Logo from '../../component/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {login}  from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import holyForm from '../../component/holy-form/holy-form'


@connect(
  state=>state.user,
  {login}
)
@holyForm
class Login extends React.Component{
  constructor(props){
    super(props)
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  register(){
    console.log(this.props)
    this.props.history.push('/register')
  }

  handleLogin(){
    this.props.login(this.props.state)
  }
  render(){
    return (
      <div>
        {this.props.redirectTo&&this.props.redirectTo!=='/login'?<Redirect to={this.props.redirectTo}/>:null}
        <Logo/>
        <WingBlank>
          <List>
            {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
            <InputItem onChange={v=>this.props.handleChange('user',v)}
            >用户名</InputItem>
            <InputItem onChange={v=>this.props.handleChange('pwd',v)} type='password'
            >密码</InputItem>
          </List>
          <Button onClick={this.handleLogin} type='primary'>登录</Button>
          <WhiteSpace/>
          <Button onClick={this.register}type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login

//
//
// import { Tabs, WhiteSpace } from 'antd-mobile';
// import { StickyContainer, Sticky } from 'react-sticky';
// import { ListView } from 'antd-mobile';
// import '../../index.css'
//
// const rawData = makeData();
//
// const requestData = (pageSize, page, sorted, filtered) => {
//   return new Promise((resolve, reject) => {
//     // You can retrieve your data however you want, in this case, we will just use some local data.
//     let filteredData = rawData;
//
//     // You can use the filters in your request, but you are responsible for applying them.
//     if (filtered.length) {
//       filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
//         return filteredSoFar.filter(row => {
//           return (row[nextFilter.id] + "").includes(nextFilter.value);
//         });
//       }, filteredData);
//     }
//     // You can also use the sorting in your request, but again, you are responsible for applying it.
//     const sortedData = _.orderBy(
//       filteredData,
//       sorted.map(sort => {
//         return row => {
//           if (row[sort.id] === null || row[sort.id] === undefined) {
//             return -Infinity;
//           }
//           return typeof row[sort.id] === "string"
//             ? row[sort.id].toLowerCase()
//             : row[sort.id];
//         };
//       }),
//       sorted.map(d => (d.desc ? "desc" : "asc"))
//     );
//
//     // You must return an object containing the rows of the current page, and optionally the total pages number.
//     const res = {
//       rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
//       pages: Math.ceil(filteredData.length / pageSize)
//     };
//
//     // Here we'll simulate a server response with 500ms of delay.
//     setTimeout(() => resolve(res), 500);
//   });
// };
//
// class Login extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       data: [],
//       pages: null,
//       loading: true
//     };
//     this.fetchData = this.fetchData.bind(this);
//   }
//   fetchData(state, instance) {
//     // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
//     // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
//     this.setState({ loading: true });
//     // Request the data however you want.  Here, we'll use our mocked service we created earlier
//     requestData(
//       state.pageSize,
//       state.page,
//       state.sorted,
//       state.filtered
//     ).then(res => {
//       // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
//       this.setState({
//         data: res.rows,
//         pages: res.pages,
//         loading: false
//       });
//     });
//   }
//   render() {
//     const { data, pages, loading } = this.state;
//     return (
//       <div>
//         <ReactTable
//           columns={[
//             {
//               Header: "First Name",
//               accessor: "firstName"
//             },
//             {
//               Header: "Last Name",
//               id: "lastName",
//               accessor: d => d.lastName
//             },
//             {
//               Header: "Age",
//               accessor: "age"
//             }
//           ]}
//           manual // Forces table not to paginate or sort automatically, so we can handle it server-side
//           data={data}
//           pages={pages} // Display the total number of pages
//           loading={loading} // Display the loading overlay when we need it
//           onFetchData={this.fetchData} // Request new data when things change
//           filterable
//           defaultPageSize={10}
//           className="-striped -highlight"
//         />
//         <br />
//         <Tips />
//         <Logo />
//       </div>
//     );
//   }
// }
//
//
// const data = [
//   {
//     img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
//     title: 'Meet hotel',
//     des: '不是所有的兼职汪都需要风吹日晒',
//   },
//   {
//     img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
//     title: 'McDonald\'s invites you',
//     des: '不是所有的兼职汪都需要风吹日晒',
//   },
//   {
//     img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
//     title: 'Eat the week',
//     des: '不是所有的兼职汪都需要风吹日晒',
//   },
// ];
// const NUM_SECTIONS = 5;
// const NUM_ROWS_PER_SECTION = 5;
// let pageIndex = 0;
//
// const dataBlobs = {};
// let sectionIDs = [];
// let rowIDs = [];
// function genData(pIndex = 0) {
//   for (let i = 0; i < NUM_SECTIONS; i++) {
//     const ii = (pIndex * NUM_SECTIONS) + i;
//     const sectionName = `Section ${ii}`;
//     sectionIDs.push(sectionName);
//     dataBlobs[sectionName] = sectionName;
//     rowIDs[ii] = [];
//
//     for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
//       const rowName = `S${ii}, R${jj}`;
//       rowIDs[ii].push(rowName);
//       dataBlobs[rowName] = rowName;
//     }
//   }
//   sectionIDs = [...sectionIDs];
//   rowIDs = [...rowIDs];
// }
//
// class Demo extends React.Component {
//   constructor(props) {
//     super(props);
//     const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
//     const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
//
//     const dataSource = new ListView.DataSource({
//       getRowData,
//       getSectionHeaderData: getSectionData,
//       rowHasChanged: (row1, row2) => row1 !== row2,
//       sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
//     });
//
//     this.state = {
//       dataSource,
//       isLoading: true,
//     };
//   }
//
//   componentDidMount() {
//     // you can scroll to the specified position
//     // setTimeout(() => this.lv.scrollTo(0, 120), 800);
//
//     // simulate initial Ajax
//     setTimeout(() => {
//       genData();
//       this.setState({
//         dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
//         isLoading: false,
//       });
//     }, 600);
//   }
//
//   // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
//   // componentWillReceiveProps(nextProps) {
//   //   if (nextProps.dataSource !== this.props.dataSource) {
//   //     this.setState({
//   //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
//   //     });
//   //   }
//   // }
//
//   onEndReached = (event) => {
//     // load new data
//     // hasMore: from backend data, indicates whether it is the last page, here is false
//     if (this.state.isLoading && !this.state.hasMore) {
//       return;
//     }
//     console.log('reach end', event);
//     this.setState({ isLoading: true });
//     setTimeout(() => {
//       genData(++pageIndex);
//       this.setState({
//         dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
//         isLoading: false,
//       });
//     }, 1000);
//   }
//
//   render() {
//     const separator = (sectionID, rowID) => (
//       <div
//         key={`${sectionID}-${rowID}`}
//         style={{
//           backgroundColor: '#F5F5F9',
//           height: 8,
//           borderTop: '1px solid #ECECED',
//           borderBottom: '1px solid #ECECED',
//         }}
//       />
//     );
//     let index = data.length - 1;
//     const row = (rowData, sectionID, rowID) => {
//       if (index < 0) {
//         index = data.length - 1;
//       }
//       const obj = data[index--];
//       return (
//         <div key={rowID} style={{ padding: '0 15px' }}>
//           <div
//             style={{
//               lineHeight: '50px',
//               color: '#888',
//               fontSize: 18,
//               borderBottom: '1px solid #F6F6F6',
//             }}
//           >{obj.title}</div>
//           <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
//             <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
//             <div style={{ lineHeight: 1 }}>
//               <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
//               <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥ {rowID}</div>
//             </div>
//           </div>
//         </div>
//       );
//     };
//
//     return (
//       <ListView
//         ref={el => this.lv = el}
//         dataSource={this.state.dataSource}
//         className="am-list sticky-list"
//         useBodyScroll
//         renderSectionWrapper={sectionID => (
//           <StickyContainer
//             key={`s_${sectionID}_c`}
//             className="sticky-container"
//             style={{ zIndex: 4 }}
//           />
//         )}
//         renderSectionHeader={sectionData => (
//           <Sticky>
//             {({
//                 style,
//               }) => (
//               <div
//                 className="sticky"
//                 style={{
//                   ...style,
//                   zIndex: 3,
//                   backgroundColor: parseInt(sectionData.replace('Section ', ''), 10) % 2 ?
//                     '#5890ff' : '#F8591A',
//                   color: 'white',
//                 }}
//               >{`Task ${sectionData.split(' ')[1]}`}</div>
//             )}
//           </Sticky>
//         )}
//         renderHeader={() => <span>header</span>}
//         renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
//           {this.state.isLoading ? 'Loading...' : 'Loaded'}
//         </div>)}
//         renderRow={row}
//         renderSeparator={separator}
//         pageSize={4}
//         onScroll={() => { console.log('scroll'); }}
//         scrollEventThrottle={200}
//         onEndReached={this.onEndReached}
//         onEndReachedThreshold={10}
//       />
//     );
//   }
// }
//
//
// function renderTabBar(props) {
//   return (<Sticky>
//     {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
//   </Sticky>);
// }
// const tabs = [
//   { title: 'First Tab' },
//   { title: 'Second Tab' },
//   { title: 'Third Tab' },
// ];
//
//
// const Login = () => (
//   <div>
//     <WhiteSpace />
//     <StickyContainer>
//       <Tabs tabs={tabs}
//             initalPage={'t2'}
//             renderTabBar={renderTabBar}
//       >
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '1080px', backgroundColor: '#fff' }}>
//           <Demo/>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
//           Content of second tab
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
//           Content of third tab
//         </div>
//       </Tabs>
//     </StickyContainer>
//     <WhiteSpace />
//   </div>
// );

// export default Login
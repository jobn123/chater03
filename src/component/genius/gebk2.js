import React from "react";
import axios from 'axios'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
// import UserCard from '../usercard/usercard'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import ReactEcharts from 'echarts-for-react';

// Import React Table
// import _ from "lodash";
import ReactTable from "react-table";
import "react-table/react-table.css";
// import { makeData, Logo, Tips } from "../../Utils";

import { SegmentedControl, Calendar } from 'antd-mobile';
// import { StickyContainer, Sticky } from 'react-sticky';
// import { ListView } from 'antd-mobile';
import '../../index.css'
// import enUS from 'antd-mobile/lib/calendar/locale/en_US';
// import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';

const extra = {
  '2017/07/15': { info: 'Disable', disable: true },
};

const now = new Date();
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)] = { info: 'Disable', disable: true };


// const rawData = makeData();

// const requestData = (pageSize, page, sorted, filtered) => {
//   return new Promise((resolve, reject) => {
//     // You can retrieve your data however you want, in this case, we will just use some local data.
//     let filteredData = rawData;

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

//     // You must return an object containing the rows of the current page, and optionally the total pages number.
//     const res = {
//       rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
//       pages: Math.ceil(filteredData.length / pageSize)
//     };

//     // Here we'll simulate a server response with 500ms of delay.
//     setTimeout(() => resolve(res), 500);
//   });
// };


@connect(
  state=>state.chatuser,
  {getUserList}
)
class Genius extends React.Component {

  constructor() {
    super();
    this.state = {
      data: [],
      pages: null,
      loading: true,
      en: false,
      show: false,
      date: now,
      date_format: this._dateFormat(now),
      config: {},
      is_hot:true,
      showCalendar: false,
      segIndex: 0
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps")
    console.log(nextProps)
    
    if(nextProps.pidlist && nextProps.pidlist.length) {
      this.setState({loading: true});
      let target = "&target=" + nextProps.platform;
      let pids = "";
      nextProps.pidlist.map((pid) => {
        // console.log(pid);
        pids += "&pid=";
        pids += pid;
      });
      if (!pids) {
        pids = "&pid=1216914&pid=1217650&pid=1207042"
      }
      axios.get('http://123.56.14.124:918/trend/?format=json&page_size=50' + target + pids)
        .then(res => {
          if (res.status === 200) {
            this.setState({
              data: res.data.data,
              loading: false
            });
          }
        })
    }
  }

  componentDidMount(){
    // this.props.getUserList('genius')
    console.log("componentDidMount")
    console.log(this.props.pidlist)
  }

  _dateFormat(date) {
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate();
    return Y+M+D;
  }

  fetchData(state, instance) {
    console.log(this.props.userlist)
    console.log("fetchData")
    this.setState({ loading: true });
    let target= "&target="+this.props.platform;
    if(state.sorted[0] && state.sorted[0]['id']) {
      let obj = [...this.state.data];
      let item_id = state.sorted[0]['id']
      if(state.sorted[0]['desc']) {
        obj.sort((a, b) => a[item_id] >= b[item_id]?1:-1);
      }else{
        obj.sort((a, b) => a[item_id] < b[item_id]?1:-1);
      }
      return this.setState({data: obj, loading: false});
    }

    let pids = ""
    this.props.pidlist.map((pid)=>{
      // console.log(pid)
      pids += "&pid="
      pids += pid
    })
    if (!pids) {
      pids="&pid=1216914&pid=1217650&pid=1207042"
    }
    axios.get('http://123.56.14.124:918/trend/?format=json&page_size=50' + target + pids)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            data: res.data.data,
            loading: false
          });
        }
      })
  }

  _setColumns =()=>{

    if (this.props.platform === "baidu_index"||
      this.props.platform === "weibo_index"||
      this.props.platform === "weixin_index") {
      return [
        {
          Header: "片名(每日数值)",
          accessor: "title",
          width: 180
        },
        {
          Header: "映前5日",
          accessor: "d1_value",
          Cell: props => <div style={{textAlign: "left"}}>{props.value?props.value.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,'):'0'}</div>
        },
        {
          Header: "映前4日",
          accessor: "d2_value",
          Cell: props => <div style={{textAlign: "left"}}>{props.value?props.value.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,'):'0'}</div>
        },
        {
          Header: "映前3日",
          accessor: "d3_value",
          Cell: props => <div style={{textAlign: "left"}}>{props.value?props.value.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,'):'0'}</div>
        },
        {
          Header: "映前2日",
          accessor: "d4_value",
          Cell: props => <div style={{textAlign: "left"}}>{props.value?props.value.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,'):'0'}</div>
        },
        {
          Header: "映前1日",
          accessor: "d5_value",
          Cell: props => <div style={{textAlign: "left"}}>{props.value?props.value.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,'):'0'}</div>
        },
        {
          Header: "上映当日",
          accessor: "d6_value",
          Cell: props => <div style={{textAlign: "left"}}>{props.value?props.value.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,'):'0'}</div>
        },
      ]
    } else {
      return [
        {
          Header: "片名(每日增长量)",
          accessor: "title",
          width: 180
        },
        {
          Header: "映前5日",
          accessor: "d1_up",
          Cell: props => <div style={{textAlign: "left"}}>{props.value?props.value.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,'):'0'}</div>
        },
        {
          Header: "映前4日",
          accessor: "d2_up",
          Cell: props => <div style={{textAlign: "left"}}>{props.value?props.value.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,'):'0'}</div>
        },
        {
          Header: "映前3日",
          accessor: "d3_up",
          Cell: props => <div style={{textAlign: "left"}}>{props.value?props.value.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,'):'0'}</div>
        },
        {
          Header: "映前2日",
          accessor: "d4_up",
          Cell: props => <div style={{textAlign: "left"}}>{props.value?props.value.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,'):'0'}</div>
        },
        {
          Header: "映前1日",
          accessor: "d5_up",
          Cell: props => <div style={{textAlign: "left"}}>{props.value?props.value.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,'):'0'}</div>
        },
        {
          Header: "上映当日",
          accessor: "d6_up",
          Cell: props => <div style={{textAlign: "left"}}>{props.value?props.value.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,'):'0'}</div>
        },
      ]
    }
  }

  getOption = () => {
    // debugger
    if (this.state.data.length) {
      let obj = [...this.state.data];
      debugger
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: obj.map(function (item) {
            return item['title']
          })
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // data: ['映前5日','映前4日','映前3日','映前2日','映前1日','上映当日']
          data: obj[0].date.split(',')
        },
        yAxis: {
          type: 'value'
        },
        series: obj.map((item) => {
          if(this.props.platform === "baidu_index"||
            this.props.platform === "weibo_index"||
            this.props.platform === "weixin_index") {
            return {
              name:item['title'],
              type:'line',
              data:[item['d1_value'], item['d2_value'], item['d3_value'], item['d4_value'], item['d5_value'], item['d6_value']]
            }
          } else {
            return {
              name:item['title'],
              type:'line',
              data:[item['d1_up'], item['d2_up'], item['d3_up'], item['d4_up'], item['d5_up'], item['d6_up']]
            }
          }
        })
      };
    } else {
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:[]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: []
      };
    }
  };

  onChange = (e) => {
    console.log(e)
  }
  onCancel = (e) => {
    console.log(e)
    this.setState({
      showCalendar: false
    })
  }
  onConfirm = (a, b) => {
    const start = this.fomartDate(a)
    const end   = this.fomartDate(b)

    this.setState({
      showCalendar: false
    }, ()=>{
      console.log('---------')
    })
  }
  onValueChange = (e) => {
    console.log(e)
    // if(e === "相对时间") {
    // }
    const d = ['累计', '日增', '绝对时间', '相对时间']
    const index = d.indexOf(e)

    this.setState({
      showCalendar: true,
      segIndex: index
    })
  }

  fomartDate = (str) => {
    var d = new Date(str);
    var ts = d.getTime() - d.getTimezoneOffset()*60*1000;
    var s = new Date(ts).toISOString()

    return s.replace(/T.+$/, '');
  }
  
  render() {
    const { data, pages, loading, segIndex } = this.state;
    console.log("genius in ")
    console.log(this.props.userlist)
    console.log("aaaa ")
    console.log(this.props.datalist)
    console.log("aaa ")
    console.log(this.state)
    console.log(this.props)
    const MDate = new Date(new Date() - 5184000000)
    return (
      <div>
        <div style={{marginBottom: 20}}>
          <SegmentedControl
            selectedIndex={segIndex}
            values={['累计', '日增', '绝对时间', '相对时间']}
            onChange={this.onChange}
            onValueChange={this.onValueChange}
          />
          <Calendar
          showShortcut={true}
          title="相对时间"
          visible={this.state.showCalendar}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
          onSelectHasDisableDate={this.onSelectHasDisableDate}
          getDateExtra={this.getDateExtra}
          defaultDate={MDate}
          // minDate={new Date(+now - 5184000000)}
          maxDate={new Date(+now + 2592000000)}
        />
        </div>

        <div style={{clear: "left"}}>
          <ReactEcharts opts={{renderer: 'svg'}} notMerge={true} lazyUpdate={true} option={this.getOption()}/>
        </div>
        <div style={{clear: "left"}}>
          <ReactTable
            pages={pages} // Display the total number of pages
            columns={this._setColumns()}
            manual // Forces table not to paginate or sort automatically, so we can handle it server-side
            data={data}
            loading={loading} // Display the loading overlay when we need it
            onFetchData={this.fetchData} // Request new data when things change
            // filterable
            defaultPageSize={2}
            showPagination={false}
            showPaginationTop={true}
            showPaginationBottom={false}
            showPageJump={false}
            showPageSizeOptions={false}
            style={{
              height: "200px" // This will force the table body to overflow and scroll, since there is not enough room
            }}
            className="-striped -highlight"
          />
        </div>
        <br/>
      </div>
    );
  }
}


export default Genius

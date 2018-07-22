import React from "react";
import axios from 'axios'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'

// Import React Table
// import _ from "lodash";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeData } from "../../Utils";

import { Button,Calendar } from 'antd-mobile';
import '../../index.css'
import enUS from 'antd-mobile/lib/calendar/locale/en_US';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';

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
class Boss extends React.Component {

  // originbodyScrollY = document.getElementsByTagName('body')[0].style.overflowY;
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
    };
    this.fetchData = this.fetchData.bind(this);
    this.fetchDataBack = this.fetchDataBack.bind(this);
    this.fetchDataForward = this.fetchDataForward.bind(this);
    this.fetchDataComing = this.fetchDataComing.bind(this);
    this.fetchDataHot = this.fetchDataHot.bind(this);
  }

  componentDidMount(){
    // this.props.getUserList('genius')
  }

  renderBtn(zh, en, config = {}) {
    config.locale = this.state.en ? enUS : zhCN;
    zh = zh +"▼";
    en = en +"▼";
    return (
      <Button type="ghost" size="small" inline
              onClick={() => {
                   // document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
                   this.setState({
                     show: true,
                     config,
                   });
                 }}
      >{this.state.en ? en : zh}
      </Button>
    );
  }

  onConfirm = (startTime, endTime) => {
    // document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;

    this.setState({ loading: true });
    let coming = this.state.is_hot?0:1;
    let date_format = this._dateFormat(startTime);
    let date = "&date="+date_format;
    coming = "&coming="+coming;
    //rating
    let target= this.state.is_hot?"&target="+this.props.hot:"&target="+this.props.coming;
    axios.get('http://123.56.14.124:918/movies/?format=json&page_size=150'+date+coming+target)
      .then(res=>{
        if(res.status===200){
          this.setState({
            data: res.data.results,
            pages: 3,
            loading: false,
            date:startTime
          });
        }
      })

    this.setState({
      show: false,
      startTime,
      endTime,
      date:startTime,
      date_format:date_format
    });
  }

  onCancel = () => {
    // document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
    this.setState({
      show: false,
      startTime: undefined,
      endTime: undefined,
    });
  }

  fetchDataForward(state, instance) {
    this.setState({ loading: true });
    let coming = this.state.is_hot?0:1;
    let date = this.state.date;
    let target_date = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1);
    let date_format = this._dateFormat(target_date);
    date = "&date="+date_format;
    coming = "&coming="+coming;
    let target= this.state.is_hot?"&target="+this.props.hot:"&target="+this.props.coming;
    axios.get('http://123.56.14.124:918/movies/?format=json&page_size=150'+date+coming+target)
      .then(res=>{
        if(res.status===200){
          this.setState({
            data: res.data.results,
            pages: 3,
            loading: false,
            date:target_date,
            date_format:date_format
          });
        }
      })
  }

  _dateFormat(date) {
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate();
    return Y+M+D;
  }

  fetchDataBack(state, instance) {
    this.setState({ loading: true });
    let coming = this.state.is_hot?0:1;
    let date = this.state.date;
    let target_date = new Date(date.getFullYear(), date.getMonth(), date.getDate()-1);
    let date_format = this._dateFormat(target_date);
    date = "&date="+date_format;
    coming = "&coming="+coming;
    let target= this.state.is_hot?"&target="+this.props.hot:"&target="+this.props.coming;
    axios.get('http://123.56.14.124:918/movies/?format=json&page_size=150'+date+coming+target)
      .then(res=>{
        if(res.status===200){
          this.setState({
            data: res.data.results,
            pages: 3,
            loading: false,
            date:target_date,
            date_format:date_format
          });
        }
      })
  }

  fetchDataHot(state, instance) {
    this.setState({ loading: true });
    let coming = 0;
    let date_format = this._dateFormat(this.state.date);
    let date = "&date="+date_format;
    coming = "&coming="+coming;
    let target= "&target="+this.props.hot;
    axios.get('http://123.56.14.124:918/movies/?format=json&page_size=150'+date+coming+target)
      .then(res=>{
        if(res.status===200){
          this.setState({
            data: res.data.results,
            pages: 3,
            loading: false,
            is_hot:true,
          });
        }
      })
  }

  fetchDataComing(state, instance) {
    this.setState({ loading: true });
    let coming = 1;
    let date_format = this._dateFormat(this.state.date);
    let date = "&date="+date_format;
    coming = "&coming="+coming;
    let target= "&target="+this.props.coming;
    axios.get('http://123.56.14.124:918/movies/?format=json&page_size=150'+date+coming+target)
      .then(res=>{
        if(res.status===200){
          this.setState({
            data: res.data.results,
            pages: 3,
            loading: false,
            is_hot:false,
          });
        }
      })
  }

  fetchData(state, instance) {
    this.setState({ loading: true });
    let coming = this.state.is_hot?0:1;
    let date_format = this._dateFormat(this.state.date);
    let date = ''
    if (this.props.platform === 'total' || 
    this.props.platform === "qq" || 
    this.props.platform === "iqiyi" || 
    this.props.platform === "youku" ||
    this.props.platform === "weipai") {
      let d = new Date().getTime() - 24*60*60*1000
      let dt = new Date(d)
      let df = this._dateFormat(dt);
      date = "&date=" + df;
    } else {
      date = "&date="+date_format;
    }
    // let date = "&date="+date_format;
    coming = "&coming="+coming;
    console.log(this.props)
    let target= this.state.is_hot?"&target="+this.props.hot:"&target="+this.props.coming;
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

    console.log('http://123.56.14.124:918/movies/?format=json&page_size=150'+date+coming+target)
    axios.get('http://123.56.14.124:918/movies/?format=json&page_size=150'+date+coming+target)
      .then(res=>{
        if(res.status===200){
          this.setState({
            data: res.data.results,
            pages: 3,
            loading: false
          });
        }
      })
  }

  _setColumns =()=>{
    if (this.props.platform === "weibo") {
      return [
        {
          Header: "标题",
          accessor: "title",
          // width: 160
        },
        {
          Header: "上映日期",
          accessor: "show_time",
          Cell: props => <div style={{textAlign: "right"}}>{props.value}</div>,
        },
        {
          Header: "大V推荐",
          accessor: 'weibo_v_rating',
          Cell: props => <div style={{color: 'red',textAlign: "right"}}>
            {props.value == null ? 0 : props.value.toString() + '%'}
            </div>,
        },{
          Header: "评分",
          accessor: this.props.hot,
          width: 50,
          Cell: props => <div style={{color: 'red',textAlign: "right", marginRight: 10}}>
            {props.value == null ? 0 :props.value.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,')}
            </div>,
        }]
    }
    if (this.props.platform === "total" || 
      this.props.platform === "qq" || 
      this.props.platform === "iqiyi" || 
      this.props.platform === "youku" ||
      this.props.platform === "weipai" ) {
      return [
        {
          Header: "标题",
          accessor: "title",
          width: 160
        },
        {
          Header: "上映日期",
          accessor: "show_time",
          Cell: props => <div style={{textAlign: "right"}}>{props.value}</div>,
        },
        {
          Header: "播放量",
          accessor: this.props.hot,
          Cell: props => <div style={{color: 'red',textAlign: "right"}}>
            {props.value == null ? 0 : parseInt(props.value).toLocaleString()}
            </div>,
        }]
    }
    if(this.props.platform === "weibo_index" ||
      this.props.platform === "weixin_index"||
      this.props.platform === "weibo_discuss_count"||
      this.props.platform === "weibo_view_count"||
      this.props.platform === "baidu_index" ) {
      return [
        {
          Header: "标题",
          accessor: "title",
          width: 180
        },
        {
          Header: "上映日期",
          accessor: "show_time",
          Cell: props => <div style={{textAlign: "right"}}>{props.value}</div>,
        },
        {
          Header: "数值",
          accessor: this.props.hot,
          Cell: props => <div style={{color: 'red',textAlign: "right", marginRight: 10}}>
            {props.value.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,')}
            </div>,
        }]
    } else if (this.state.is_hot){
      return [
        {
          Header: "标题",
          accessor: "title",
          width: 180
        },
        {
          Header: "上映日期",
          accessor: "show_time",
          Cell: props => <div style={{textAlign: "right"}}>{props.value}</div>,
        },
        {
          Header: "评分",
          accessor: this.props.hot,
          Cell: props => <div style={{color: 'red',textAlign: "right", marginRight: 10}}>{props.value<1?"-":props.value}</div>,
        }]
    } else {
      return[
        {
          Header: "标题",
          accessor: "title",
          width: 180
        },
        {
          Header: "上映日期",
          accessor: "show_time",
          Cell: props => <div style={{textAlign: "right"}}>{props.value}</div>
        },
        {
          Header: "想看数",
          accessor: this.props.coming,
          Cell: props => <div style={{color: 'red',textAlign: "right", marginRight: 10}}>
            {props.value.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,')}
            </div>,
        }]
    }
  }
  render() {
    const { data, pages, loading } = this.state;
    return (
      <div>
      <div>
        <div style={{float:"left",width: "43%"}}>
          <Button inline size="small" type={this.state.is_hot?"primary":"ghost"} onClick={this.fetchDataHot} >{"已上映"}</Button>
          <Button inline size="small" type={this.state.is_hot?"ghost":"primary"} onClick={this.fetchDataComing} >{"即将上映"}</Button>
        </div>
        <div style={{float:"left",width: "57%"}}>
          <div align="right" style={{float:"right"}}><Button inline size="small" onClick={this.fetchDataForward} >{">"}</Button></div>
          <div align="right" style={{float:"right"}}>{this.renderBtn(this.state.date_format, this.state.date_format, { type: 'one' })}</div>
          <div align="right" ><Button inline size="small" onClick={this.fetchDataBack} >{"<"}</Button></div>
        {/* <Calendar
          {...this.state.config}
          visible={this.state.show}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
          onSelectHasDisableDate={this.onSelectHasDisableDate}
          getDateExtra={this.getDateExtra}
          defaultDate={now}
          minDate={new Date(+now - 5184000000)}
          maxDate={new Date(+now + 31536000000)}
        /> */}
        </div>
        
        <div style={{clear: "left"}}>
          <ReactTable
            resizable={false}
            pages={pages} // Display the total number of pages
            columns={this._setColumns()}
            manual // Forces table not to paginate or sort automatically, so we can handle it server-side
            data={data}
            loading={loading} // Display the loading overlay when we need it
            onFetchData={this.fetchData} // Request new data when things change
            // filterable
            defaultPageSize={10}
            showPagination={false}
            showPaginationTop={true}
            showPaginationBottom={false}
            showPageJump={false}
            showPageSizeOptions={false}
            style={{
              // height: "600px" // This will force the table body to overflow and scroll, since there is not enough room
            }}
            className="-striped -highlight"
          />
        </div>
        <br />
      </div>
      </div>
    );
  }
}

export default Boss

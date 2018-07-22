import axios from "axios/index";

const USER_LIST = 'USER_LIST'

const initState = {
  pidlist:[],
  datalist:[],

}

export function chatuser(state=initState,action) {
  switch (action.type){
    case USER_LIST:
      return {...state,pidlist:action.payload.pidlist,datalist:action.payload.data}
    default:
      return state
  }
}

function userList(data,pidlist) {
  return{type:USER_LIST,payload:{data,pidlist}}
}

function fomartDate (str) {
  var d = new Date(str);
  var ts = d.getTime() - d.getTimezoneOffset()*60*1000;
  var s = new Date(ts).toISOString()
  
  return s.replace(/T.+$/, '');
}

export function getUserList(pidlist,target) {

  // console.log("getUserList")
  let pids = ""
  pidlist.map((pid)=>{
    // console.log(pid)
    pids += "&pid="
    pids += pid
  })
  return dispatch=>{
    //http://123.56.14.124:918/trend/?format=json&pid=1208942&pid=248170&start=2018-05-23&end=2018-06-12&target=maoyan_wish_up
    let e = new Date()
    let s = new Date(e.getTime() + 2592000000)
    let start = fomartDate(s);
    let end = fomartDate(e)

    axios.get('http://123.56.14.124:918/trend/?format=json&target='+target+pids+'&start='+ start + '&end='+ end)
      .then(res=>{
        if(res.status===200){
          // console.log("dispatch")
          // console.log(pidlist)
          dispatch(userList(res.data.data,pidlist))
        }
      })
  }

}
//
// export function getUserList(pidlist) {
//   console.log(pidlist)
//
//   let pids = ""
//   pidlist.map((pid)=>{
//     console.log(pid)
//     pids += "&pid="
//     pids += pid
//   })
//   return dispatch=>{
//     axios.get('http://localhost:918/titles/?format=json&page_size=50&target=wish_count'+pids)
//       .then(res=>{
//         if(res.status===200){
//           dispatch(userList(res.data.results))
//         }
//       })
//     // axios.get('/user/list?type='+type)
//     //   .then(res=>{
//     //     console.log(res)
//     //     if(res.data.code===0){
//     //       dispatch(userList(res.data.data))
//     //     }
//     //   })
//   }
// }


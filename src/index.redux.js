// const ADD_GUN = '加机关枪'
// const REMOVE_GUN = '减机关枪'
const ADD_GUN = ''
const REMOVE_GUN = ''

export function counter(state=10,action) {
  switch (action.type){
    case ADD_GUN:
      return state+1
    case REMOVE_GUN:
      return state-1
    default:
      return state
  }
}

export function addGun() {
  return{type:ADD_GUN}
}


export function removeGun() {
  return{type:REMOVE_GUN}
}

export function addGunAsync() {
  return dispatch=>{
    setTimeout(()=>{
      dispatch(addGun())
    },2000)
  }
}
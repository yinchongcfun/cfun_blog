import {GET,POST} from './axios.js'
let admins = 'https://api.cfun.vip/';
const getIndexList = (params) =>{
  return GET(params,admins + 'index',{})
}

const getDetail = (params) =>{
  return GET(params,admins + 'detail',{})
}

const getRelate = (params) =>{
  return GET(params,admins + 'api/category',{})
}

const getArticle = (params) =>{
  return GET(params,admins + 'api/tag',{})
}

const addArticle = (params) =>{
  return POST(params,admins + 'admin/add',{})
}

const setHotArticle = (params) =>{
  return GET(params,admins + 'admin/sethot',{})
}

//获取音乐列表
const getMusicList = (params) =>{
    return GET(params,admins + 'api/musiclist',{})
}

export default{
  getIndexList,
  getDetail,
  getRelate,
  getArticle,
  addArticle,
  setHotArticle,
  getMusicList
}

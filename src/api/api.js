import axios from 'axios';

let base = 'https://api.cfun.vip/';

export const requestLogin = params => { return axios.post(`${base}/admin/login`, params).then(res => res.data); };

export const addArticle = params => { return axios.post(`${base}/admin/add`, params).then(res => res.data); };//添加文章

export const getIndexList = params => { return axios.get(`${base}/index`, { params: params }); };  //获取首页列表


export const getRelate = params => { return axios.get(`${base}/api/category`, params).then(res => res.data); };//获取相关

export const setHotArticle = params => { return axios.get(`${base}/admin/sethot`, params).then(res => res.data); };//设置热门文章

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };//获取用户列表

export const deleteArticle = params => { return axios.get(`${base}/admin/delete`, { params: params }); }; //删除文章

export const detailArticle = params => { return axios.get(`${base}admin/detail`, { params: params }).then(res => res.data); };

export const addMusicMsg = params => { return axios.post(`${base}admin/addmusic`, params).then(res => res.data); };//添加音乐信息

export const getMusicList = params => { return axios.get(`${base}api/musiclist`, params).then(res => res.data); };//获取音乐列表

export const getDetail = params => { return axios.get(`${base}/detail`, { params: params }).then(res => res.data); };//获取详情

//获取七牛的token
export const qiniuTokenApi = params => { return axios.get(`${base}/admin/qiniutoken`, params).then(res => res.data); };






import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios);

// GET请求
function GET(params, url, header = {}){
  let query = ''
  let urls = url;
  for(var p in params){
    query = query + p + '=' + params[p] + '&'
  }
  if(query){
    urls = urls + '?' + query
  }
  let request = {
    params, 
    url: urls,
    header: header
  }
  return requests('get',request)
}
// POST请求

function POST(params, url, header = {}){
  let request = {
    params, 
    url,
    header
  }
  return requests('post',request)
}
// request发起请求
function requests(method,request){
  let params = request.params;
  let url = request.url;
  let header = Object.assign(request.header, {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    // 'Access-Control-Allow-Credentials':true,
    // 'Access-Control-Allow-Headers': 'x-requested-with,Origin, Content-Type, Cookie, Accept',
    // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, OPTIONS',
    // 'OPTIONSAccess-Control-Allow-Origin': '*',
    // 'Authroization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMTguMjQuOTMuMTg1XC9hZG1pblwvbG9naW4iLCJpYXQiOjE1NjE1Mjc3MDEsImV4cCI6MTU2MTUzMTMwMSwibmJmIjoxNTYxNTI3NzAxLCJqdGkiOiJHenloWDM5ZUkwQUpiYWVqIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.PClSH6R0kR1weLF64ehXkwp38sc9wh2AwfuG24-pfIE'
  })
  return new Promise(function(resolve,reject){
    axios({
      method: method,
      headers: header,
      // data: params,
      url: url,
      responseType: "json",
    }).then((res)=>{
       resolve(res)
    }).catch((error)=>{
      resolve(error)
    })
  })
}
export {
  GET,
  POST
}
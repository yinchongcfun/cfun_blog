import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import List from './views/article/list.vue'
import Mark from './views/article/mark.vue'
import Editormd from './views/article/editor.md.vue'
import Img from './views/article/qiniu.vue'

import Music from './views/music/music.vue'
import AddMusic from './views/music/add.vue'

import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

import Cover from './pages/components/coverFace.vue'
import Index from './pages/components/index.vue'
import Details from './pages/components/details.vue'


let routes = [
    // 页面路由
    {
        path: '/',
        component: Cover,
        name: '',
        hidden: true,
        meta: {
            name: 'referrer',
            content: 'no-referrer'
        }
    },
    {
        path: '/index',
        component: Index,
        name: 'index',
        hidden: true
    },
    {
        path: '/detail',
        component: Details,
        name: 'detail',
        hidden: true
    },
    {
        path: '/mark',
        component: Mark,
        name: 'mark',
        hidden: true
    },
    // 登录和后台路由
    {
        path: '/login',
        component: Login,
        name: 'login',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/admin',
        component: Home,
        name: '文章管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            {path: '/admin/list', component: List, name: '文章列表'},
            {path: '/admin/mark', component: Mark, name: '添加文章'},
            {path: '/admin/editor', component: Editormd, name: '添加文章2'},
            {path: '/admin/img', component: Img, name: '添加图片'},
        ]
    },
    {
        path: '/admin',
        component: Home,
        name: '音乐管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            {path: '/admin/music', component: Music, name: '音乐列表'},
            {path: '/admin/addmusic', component: AddMusic, name: '音乐添加'}
        ]
    },
    {
        path: '/admin',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            {path: '/admin/page6', component: Page6, name: '导航三'}
        ]
    },
    {
        path: '/admin',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            {path: '/admin/echarts', component: echarts, name: 'echarts'}
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: {path: '/404'}
    }
];

export default routes;

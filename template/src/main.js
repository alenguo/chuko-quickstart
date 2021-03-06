import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main',
      'pages/demo-button/main',
      'pages/demo-avatar/main',
      'pages/demo-cell/main',
      'pages/demo-form/main',
      'pages/demo-panel/main',
      'pages/contacts/main', 
      'pages/authCode/main',
      'pages/checkBox/main',
      'pages/empty/main',
      'pages/navBar/main',
      'pages/popupAnim/main',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'Chuko_mpvue',
      navigationBarTextStyle: 'black'
    }
  }
}

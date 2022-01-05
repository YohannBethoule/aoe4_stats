import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueRouter from "vue-router";
import './styles/app.css';
import vuetify from './plugins/vuetify'
import Home from "@/pages/Home";
import PageLeaderboards from "@/pages/PageLeaderboards";
import store from './store'
import About from "@/pages/PageAbout";
import Profile from "@/pages/PageProfile";
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import darkUnica from "highcharts/themes/dark-unica";

darkUnica(Highcharts);
Vue.use(HighchartsVue);

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuex)

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    {path: '', component: Home},
    {path: '/profile/:profile_id', component: Profile, props: true},
    {path: '/leaderboards', component: PageLeaderboards},
    {path: '/about', component: About},
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    routes, // short for `routes: routes`>
})

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')

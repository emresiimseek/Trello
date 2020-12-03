import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SuiVue from 'semantic-ui-vue';
import users from './store/modules/users';


Vue.config.productionTip = false
Vue.use(SuiVue);

router.beforeEach((to, from, next) => {

  if (to.matched.some((record) => record.meta.requirehAuth && to.path !== '/login')) {

    if (sessionStorage.getItem("token")== null) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }

});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

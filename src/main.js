import 'babel-polyfill'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueFetch from './plugins/fetch'
// import VueFetch, { $fetch } from './plugins/fetch'
import App from './components/App.vue'
import router from './router'
import * as filters from './filters'
import store from './store'

for (const key in filters) {
    Vue.filter(key, filters[key])
}

Vue.use(VueFetch, {
    baseUrl: 'http://localhost:3000/',
})

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCk7ZZxrrZmZIwOyxCvy1wt4om9O_hQ7To',
        libraries: 'places',
    },
    installComponents: true,
})

sync(store, router)

async function main() {
    await store.dispatch('init')

    new Vue({
        ...App,
        el: '#app',
        router,
        store,
    })
}

main()

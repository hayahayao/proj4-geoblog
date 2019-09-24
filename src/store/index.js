import Vue from 'vue'
import Vuex from 'vuex'
import { $fetch } from '../plugins/fetch'
import router from '../router'
import maps from './maps'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 在非生产环境下启用严格模式
    // 避免在mutation中使用异步调用
    strict: process.env.NODE_ENV !== 'production',

    state() {
        return {
            user: null,
        }
    },
    getters: {
        user: state => state.user,
        userPicture: (state, getters) => {
            const user = getters.user
            if (user) {
                const photos = user.profile.photos
                if (photos.length !== 0) {
                    return photos[0].value
                }
            }
        },
    },
    mutations: {
        user: (state, user) => {
            state.user = user
        },
    },
    actions: {
        async init({ dispatch }) {
            await dispatch('login')
        },
        async login({ commit }) {
            try {
                const user = await $fetch('user')
                commit('user', user)

                // 重定向到对应的路由，或返回首页
                if (user) {
                    router.replace(router.currentRoute.params.wantedRoute || { name: 'home' })
                }
            } catch (e) {
                // eslint-disable-next-line no-console
                console.warn(e)
            }
        },
        logout({ commit }) {
            commit('user', null)

            $fetch('logout')

            // 如果路由是私有的则跳转到登录界面
            if (router.currentRoute.matched.some(r => r.meta.private)) {
                router.replace({ name: 'login', params: {
                    wantedRoute: router.currentRoute.fullPath,
                }})
            }
        },
    },
    modules: {
        maps,
    },
})

export default store

import { $fetch } from '../plugins/fetch'

let fetchPostsUid = 0

export default {
    namespaced: true,

    state() {
        return {
            // 博客草稿
            draft: null,
            // 上一次请求的地图范围，防止重复请求
            mapBounds: null,
            // 当前地图范围内的博客
            posts: [],
            // 当前选中的博客ID
            selectedPostId: null,
            // 获取选中博客的详情
            selectedPostDetails: null,
        }
    },
    getters: {
        draft: state => state.draft,
        posts: state => state.posts,
        selectedPost: state => state.posts.find(p => p._id === state.selectedPostId),
        currentPost: (state, getters) => state.draft || getters.selectedPost,
        selectedPostDetails: state => state.selectedPostDetails,
    },
    mutations: {
        addPost(state, value) {
            state.posts.push(value)
        },
        draft(state, value) {
            state.draft = value
        },
        posts(state, { posts, mapBounds }) {
            state.posts = posts
            state.mapBounds = mapBounds
        },
        selectedPostId(state, value) {
            state.selectedPostId = value
        },
        updateDraft(state, value) {
            Object.assign(state.draft, value)
        },
        selectedPostDetails(state, value) {
            state.selectedPostDetails = value
        },
        addComment(state, { post, comment }) {
            post.comments.push(comment)
        }
    },
    actions: {
        clearDraft({ commit }) {
            commit('draft', null)
        },
        createDraft({ commit }) {
            commit('draft', {
                title: '',
                content: '',
                position: null,
                placeId: null,
            })
        },
        updateDraft({ commit }, draft) {
            commit('updateDraft', draft)
        },
        setDraftLocation({ dispatch, getters }, { position, placeId }) {
            if (!getters.draft) {
                dispatch('createDraft')
            }
            dispatch('updateDraft', {
                position,
                placeId,
            })
        },
        async createPost({ commit, dispatch }, draft) {
            const data = {
                ...draft,
                position: draft.position.toJSON(),
            }
            const result = await $fetch('posts/new', {
                method: 'POST',
                body: JSON.stringify(data),
            })
            dispatch('clearDraft')
            commit('addPost', result)
            dispatch('selectPost', result._id) // 自动选中新建博客
        },
        async selectPost({ commit }, id) {
            commit('selectedPostDetails', null)
            commit('selectedPostId', id)
            const details = await $fetch(`posts/${id}`)
            commit('selectedPostDetails', details)
        },
        async fetchPosts ({ commit, state }, { mapBounds, force }) {
            let oldBounds = state.mapBounds
            if (force || !oldBounds || !oldBounds.equals(mapBounds)) {
                const requestId = ++fetchPostsUid

                // 发送请求
                const ne = mapBounds.getNorthEast()
                const sw = mapBounds.getSouthWest()
                const query = `posts ne=${
                    encodeURIComponent(ne.toUrlValue())
                }&sw=${
                    encodeURIComponent(sw.toUrlValue())
                }`
                const posts = await $fetch(query)

                // 当检测到发送了另一个查询请求时（两个id不相等时）
                // 终止这里的操作
                if (requestId === fetchPostsUid) {
                    commit('posts', {
                        posts,
                        mapBounds,
                    })
                }
            }
        },
        'logout': {
            handler({ commit }) {
                commit('posts', {
                    posts: [],
                    mapBounds: null,
                })
            },
            root: true,
        },
        'logged-in': {
            handler({ dispatch, state }) {
                if (state.mapBounds) {
                    dispatch('fetchPosts', {
                        mapBounds: state.mapBounds,
                        force: true,
                    })
                }
                if (state.selectedPostId) {
                    dispatch('selectPost', state.selectedPostId)
                }
            },
            root: true,
        },
        unselect({ commit }) {
            commit('selectedPostId', null)
        },
        async sendComment({ commit, rootGetters }, { post, comment }) {
            const user = rootGetters.user
            commit('addComment', {
                post,
                comment: {
                    ...comment,
                    date: new Date(),
                    user_id: user._id,
                    author: user,
                },
            })

            await $fetch(`posts/${post._id}/comment`, {
                method: 'POST',
                body: JSON.stringify(comment),
            })
        },
    }
}
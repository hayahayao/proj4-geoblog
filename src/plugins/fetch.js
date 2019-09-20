import router from '../router'

let baseUrl

export default {
    install(Vue, options) {
        baseUrl = options.baseUrl

        Vue.prototype.$fetch = $fetch
    }
}

export async function $fetch(url, options) {
    const finalOptions = Object.assign({}, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }, options)
    const response = await fetch(`${baseUrl}${url}`, finalOptions)
    if (response.ok) {
        const data = await response.json()
        return data
    } else if (response.status === 403) {
        // TODO: 登出
    } else {
        const message = await response.text()
        const error = new Error(message)
        error.response = response
        throw error
    }
}

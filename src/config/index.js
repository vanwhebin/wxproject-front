export default {
    token: 'token',
    apiUrl: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8003' : 'http://tk.freebie-queen.com',
    uploadUrl: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8003/api/v1/upload/' : 'http://tk.freebie-queen.com/api/v1/upload/',
    version: '/v1',
    login_page: '/api/login',
    tokenExpire: {
        access_token: 2 * 3600 * 1000,
        refresh_token: 24 * 3600 * 1000
    },
    ACCESS_TOKEN: 'Access-Token',
    REFRESH_TOKEN: 'Refresh-Token',
    storageOptions: {
        namespace: 'pro__', // key prefix
        name: 'ls', // name variable Vue.[ls] or this.[$ls],
        storage: 'local' // storage name session, local, memory
    }
}

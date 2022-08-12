export const store = (axios, data) => axios.post('/api/training-session', data)
export const index = (axios, query) => axios.get('/api/training-session', query).then(_ => _.data)
export const show = (axios, params) => axios.get(`/api/training-session/${params}`).then(_ => _.data)
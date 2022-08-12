export const index = (axios, id, params) => axios.get(`/api/diary`, { params }).then(_ => _.data)
export const store = (axios, data) => axios.post('/api/diary', data)
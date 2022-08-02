export const index = (axios, id, params) => axios.get(`/api/meal`, { params }).then(_ => _.data)
export const store = (axios, data) => axios.post('/api/meal', data)
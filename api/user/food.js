export const index = (axios, params) => axios.get('/api/food', { params }).then(_ => _.data)
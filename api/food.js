export const index = (axios, params) => axios.get('/admin/food', { params }).then(_ => _.data)
export const store = (axios,data) => axios.post('/admin/food',data)
export const show = (axios,id) => axios.get(`/admin/food/${id}`).then(_ => _.data)
export const update = (axios,id,data) => axios.put(`/admin/food/${id}`,data)
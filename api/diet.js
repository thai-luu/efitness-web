export const index = (axios) => axios.get('/admin/diet').then(_ => _.data)
export const show = (axios,id) => axios.get(`/admin/diet/${id}`).then(_ => _.data)
export const edit = (axios,id,data) => axios.put(`/admin/diet/${id}`,data)
export const create = (axios,data) => axios.put(`/admin/diet/${id}`,data)
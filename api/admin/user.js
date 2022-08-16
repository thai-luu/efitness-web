export const index = (axios, params) => axios.get('/admin/user', { params }).then(_ => _.data)
export const block = (axios, id) => axios.put(`/admin/user-block/${id}`)
export const unBlock = (axios, id) => axios.put(`/admin/user-unblock/${id}`)
export const update = (axios, id, data) => axios.put(`/admin/user/${id}`, data)
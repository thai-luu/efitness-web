export const create = (axios,data) => axios.post('/admin/training-session',data)
export const getAll= (axios, params) => axios.get('/admin/training-session', { params }).then(_ => _.data)
export const getTrainingSession = (axios,id) => axios.get(`/admin/training-session/${id}`).then(_ => _.data)
export const edit = (axios,id,data) => axios.put(`/admin/training-session/${id}`,data)
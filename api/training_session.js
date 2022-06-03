export const create = (axios,data) => axios.post('/admin/training-session',data)
export const getAll= (axios) => axios.get('/admin/training-session').then(_ => _.data)
export const getTrainingSession = (axios,id) => axios.get(`/admin/training-session/${id}`).then(_ => _.data)
export const edit = (axios,id,data) => axios.put(`/admin/training-session/${id}`,data)
export const index = (axios, id, params) => axios.get(`/api/${id}/meal`, { params }).then(_ => _.data)
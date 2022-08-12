export const deleteDiet = (axios, id) => axios.delete(`/admin/diet/${id}`)
export const showDiet = (axios, id) => axios.get(`/admin/diet/${id}`).then(_ => _.data)
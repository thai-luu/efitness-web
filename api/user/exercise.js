export const createExercise = (axios,data) => axios.post('api/exercise',data)
export const index = (axios, params) => axios.get('api/exercise', { params }).then(_ => _.data)
export const deleteExercise = (axios, id) => axios.delete(`api/exercise/${id}`)
export const deleteMultiple = (axios, data) => axios.post('api/exercise/delete-multiple', data) 
export const update = (axios, id, data) => axios.put(`api/exercise/${id}`, data)
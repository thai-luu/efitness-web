export const getExercises = (axios, params) => axios.get('/admin/exercise', { params }).then(_ => _.data)
export const deleteExercise = (axios, id) => axios.delete(`/admin/exercise/${id}`)
export const showExercise = (axios, id) => axios.get(`/admin/exercise/${id}`).then(_ => _.data)
export const updateExercise = (axios, id, data) => axios.put(`/admin/exercise/${id}`, data) 
// export const getExercisesDialog = (axios) => axios.get('/admin/exercise-dialog').then(_ => _.data)
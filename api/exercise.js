export const getExercises = (axios) => axios.get('/admin/exercise').then(_ => _.data)
export const createExercise = (axios) => axios.post('admin/exercise')
export const getLevels = (axios,data) => axios.get('/admin/level',data).then(_ => _.data)
export const getExercises = (axios) => axios.get('/admin/exercise').then(_ => _.data)
export const createExercise = (axios,data) => axios.post('admin/exercise',data)
export const getLevels = (axios,data) => axios.get('/admin/level',data).then(_ => _.data)
export const createExercise = (axios,data) => axios.post('api/exercise',data)
export const index = (axios, params) => axios.get('api/exercise', { params }).then(_ => _.data)
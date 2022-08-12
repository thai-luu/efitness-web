export const allExampleTrainningSession = (axios) => axios.get('/admin/lesson/emxample_lesson')
export const indexLesson = (axios) => axios.get('/admin/lesson')
export const showLesson = (axios, id) => axios.get(`/admin/lesson/${id}`).then(_=>_.data)
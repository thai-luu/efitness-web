export const index = (axios) => axios.get('/api/classify').then(_ => _.data)
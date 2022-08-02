export const store = (axios, data) => axios.post('/api/training-session', data)
export const index = (axios) => axios.get('/api/training-session').then(_ => _.data)
export const index = (axios) => axios.get('/api/system/training-session').then(_ => _.data)
export const indexProfile = (axios) => axios.get('/api/system/training-session-profile').then(_ => _.data)
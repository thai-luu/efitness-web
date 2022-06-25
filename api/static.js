export const indexTargets = (axios) => axios.get('/api/target').then(_ => _.data)
export const indexLevels = (axios) => axios.get('/api/level').then(_ => _.data)
export const modeLists = (axios) => axios.get('/api/mode').then(_ => _.data)
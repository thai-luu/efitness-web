export const evaluate = (axios, data) => axios.post(`/api/evaluate`, data).then(_ => _.data)
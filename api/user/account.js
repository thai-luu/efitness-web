import axios from 'axios'
export const register = data => axios.post('/user/register',data)
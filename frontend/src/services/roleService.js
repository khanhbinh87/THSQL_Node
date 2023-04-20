import axios from '../setup/axios'
const createRole = (roles) => {
    return axios.post('/api/v1/role/create', [ ...roles ])
}

export { createRole }

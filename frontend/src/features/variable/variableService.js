import axios from 'axios';

const API_URL = '/api/variables';

// Create new variable
const create = async(data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.post(API_URL, data, config);

    return response.data;
}

// Get variables
const getAll = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(API_URL, config);

    return response.data;
}

// Get variable
const get = async(id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(`${API_URL}/${id}`, config);

    return response.data;
}

// Update variable
const update = async(data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.put(`${API_URL}/${data._id}`, data, config);

    return response.data;
}

// Delete variable
const remove = async(id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.delete(`${API_URL}/${id}`, config);

    return response.data;
}

const variableService = {
    create,
    getAll,
    get,
    update,
    remove,
};

export default variableService;
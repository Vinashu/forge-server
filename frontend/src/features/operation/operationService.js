import axios from 'axios';

const API_URL = '/api/operations';

// Create new operation
const create = async(data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.post(API_URL, data, config);

    return response.data;
}

// Get operations
const getAll = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(API_URL, config);

    return response.data;
}

// Get operation
const get = async(id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(`${API_URL}/${id}`, config);

    return response.data;
}

// Update operation
const update = async(data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.put(`${API_URL}/${data._id}`, data, config);

    return response.data;
}

// Delete operation
const remove = async(id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.delete(`${API_URL}/${id}`, config);

    return response.data;
}

const operationService = {
    create,
    getAll,
    get,
    update,
    remove,
};

export default operationService;
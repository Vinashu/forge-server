import axios from 'axios';

const API_URL = '/api/rewards';

// Create new reward
const create = async(data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.post(API_URL, data, config);

    return response.data;
}

// Get rewards
const getAll = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(API_URL, config);

    return response.data;
}

// Get reward
const get = async(id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(`${API_URL}/${id}`, config);

    return response.data;
}

// Update reward
const update = async(data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.put(`${API_URL}/${data._id}`, data, config);

    return response.data;
}

// Delete reward
const remove = async(id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.delete(`${API_URL}/${id}`, config);

    return response.data;
}

const rewardService = {
    create,
    getAll,
    get,
    update,
    remove,
};

export default rewardService;
// Base URL for the API
const BASE_URL = 'http://localhost/api';  // Adjust the URL based on your actual API location

// User API interactions
const userApi = {
    getAllUsers: async () => {
        return fetch(`${BASE_URL}/user`, { method: 'GET' })
            .then(response => response.json());
    },
    getUserById: async (id) => {
        return fetch(`${BASE_URL}/user/${id}`, { method: 'GET' })
            .then(response => response.json());
    },
    createUser: async (userData) => {
        return fetch(`${BASE_URL}/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
            .then(response => response.json());
    },
    updateUser: async (id, userData) => {
        return fetch(`${BASE_URL}/user/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
            .then(response => response.json());
    },
    deleteUser: async (id) => {
        return fetch(`${BASE_URL}/user/${id}`, { method: 'DELETE' })
            .then(response => response.json());
    }
};

// History API interactions
const historyApi = {
    getAllHistories: async () => {
        return fetch(`${BASE_URL}/history`, { method: 'GET' })
            .then(response => response.json());
    },
    getHistoryById: async (id) => {
        return fetch(`${BASE_URL}/history/${id}`, { method: 'GET' })
            .then(response => response.json());
    },
    createHistory: async (historyData) => {
        return fetch(`${BASE_URL}/history`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(historyData)
        })
            .then(response => response.json());
    },
    updateHistory: async (id, historyData) => {
        return fetch(`${BASE_URL}/history/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(historyData)
        })
            .then(response => response.json());
    },
    deleteHistory: async (id) => {
        return fetch(`${BASE_URL}/history/${id}`, { method: 'DELETE' })
            .then(response => response.json());
    }
};

// Usage example:
// userApi.getAllUsers().then(users => console.log(users));
// historyApi.createHistory({ user_id: 1, user_score: 120 }).then(response => console.log(response));

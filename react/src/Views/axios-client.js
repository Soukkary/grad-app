import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(async (config) => {
    // Fetch CSRF token from your Laravel backend
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/sanctum/csrf-cookie`);
    // Include CSRF token in the headers
    config.headers['X-XSRF-TOKEN'] = response.data.csrf_token;

    // Include authorization token if available
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;
        if (response && response.status === 401) {
            localStorage.removeItem('ACCESS_TOKEN');
        }
        else
        {
            console.log(response);
        }

        throw error;
    }
);

export default axiosClient;

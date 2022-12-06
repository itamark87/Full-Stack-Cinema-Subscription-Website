import axios from 'axios';


// Create axios instance for all slices
export const instance = axios.create({
    baseURL: "http://localhost:5001",
});


// Add token to request header interceptor
instance.interceptors.request.use(req => {
    let token = sessionStorage.getItem('token');
    req.headers = {...req.headers, "x-access-token": token};
    return req;
});


// Response interceptor - Update refreshed token / Trigger logout if token expired
instance.interceptors.response.use(res => {
    let token = res.data.token;
    let permissions = res.data.permissions;
    let username = res.data.username;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('permissions', permissions);
    sessionStorage.setItem('username', username);
    return res;
}, err => {
    alert(err.response.data.error);
    if (err.response.data.error === "Token Expired") {
    alert('Session timeout. Please Login again.');
    triggerLogout();
    } else if (err.response.data.error === "Bad Token") {
    alert('Error with authentification. Please Login again.');
    triggerLogout();
    };
});


const triggerLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('permissions');
    sessionStorage.removeItem('username');
    window.location.href = "/login";
};

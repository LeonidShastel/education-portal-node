import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (userForm) => {
    const {data} = await $authHost.post('api/user/registration', {...userForm});
    return jwt_decode(data.token);
}
export const login = async (email,password, save=true) => {
    const {data} = await $host.post('api/user/login', {email, password});
    if (save)
        localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const getById = async (id) => {
    const {data} = await $host.get(`api/user/${id}`);
    return data;
}
export const check = async () => {
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}
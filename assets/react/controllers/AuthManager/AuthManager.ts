import axios from "axios";

export function storeToken(token:string) {
    console.log("Storing a new token!");
    window.localStorage.setItem('token', token);
}

export function getToken() {
    return window.localStorage.getItem('token');
}

export function clearToken() {
    console.log("Removing token from storage");
    window.localStorage.removeItem('token');
}

export function clearStorage() {
    console.log("Clearing all local storage.");
    window.localStorage.clear();
}

export async function makeAuthCallToken(url: string, token: string, method: string, data: any) {
    return axios({
        method: method,
        url: url,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: data
    });
}

export async function makeAuthCall(url: string, method: string, data: any) {
    let response = await axios({
        method: method,
        url: url,
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        data: data
    })
    if (response.status === 401 || response.status === 403) {
        clearToken();
        console.log("Authorization token has expired!!");
        //window.location.href = "https://auth.boundlessflight.net";
        return null;
    }
    return response;
}
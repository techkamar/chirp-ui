
import {BACKEND_HOST,VALIDATE_LOGIN} from './constants.js';

export async function postCallWithJSONResponseJSON(url,body_json){
    let responseJSON = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body_json)
    })
    .then(response => response.json());
    return responseJSON;
}

export async function postCallWithJSONResponseText(url,body_json){
    let user_id = localStorage.getItem("USER_ID");
    let responseText = await fetch(url, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'USER_ID': user_id
        },
        body: JSON.stringify(body_json)
    })
    .then(response => response.text());
    return responseText;
}

export async function postCallEmptyPayload(url){
    let user_id = localStorage.getItem("USER_ID");
    let responseText = await fetch(url, {
        method: 'POST',
        headers: {
            'USER_ID': user_id
        }
    })
    .then(response => response);
    return responseText;
}

export async function getCallResponseJSON(url){
    let responseJSON = await fetch(url, {
        method: 'GET',
        headers: {}
    })
    .then(response => response.json());
    return responseJSON;
}

export async function validateLogin(){
    const url = BACKEND_HOST+VALIDATE_LOGIN;
    let resp = await fetch(url, {method: 'GET'})
    if(resp.status==401){
        window.location.href = BACKEND_HOST+"/login";
    }
}

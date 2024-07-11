
export async function postCallWithJSONResponseJSON(url,body_json){
    let responseJSON = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body_json)
    })
    .then(response => response.json());
    return responseJSON;
}

export async function getCallResponseJSON(url){
    let responseJSON = await fetch(url, {
        method: 'GET',
        headers: {}
    })
    .then(response => response.json());
    return responseJSON;
}

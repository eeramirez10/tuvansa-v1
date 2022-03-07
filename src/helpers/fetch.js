

export const fetchSinToken = (endpoint,params, data, method = 'GET') => {

    params = params ? `?${new URLSearchParams(params)}` : '';

    const url = `http://localhost:3000/api/${endpoint}${params}` ;

    console.log(url)

    if(method === 'GET'){
        return fetch(url);
    }



}
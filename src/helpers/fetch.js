
const URI = "http://localhost:3000/api/"

const URIPROD = "https://backend-proscai.herokuapp.com/api/"


const URI_PROD = URIPROD;
export const fetchSinToken = (endpoint, params, data, method = 'GET', signal) => {

    params = params ? `?${new URLSearchParams(params)}` : '';

    // console.log(params)

    const url = `${URI_PROD}${endpoint}${params}`;

  

    const options = {
        method,
           
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
        
    }

    // console.log(options)

    if (method === 'GET') {
        return fetch(url,options);

    }

    return fetch(url, {
        method,
       
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
        body: JSON.stringify(data),

    });


}


export const fetchConToken = (endpoint, params, data, method = 'GET', signal) => {

    params = params ? `?${new URLSearchParams(params)}` : '';

    // console.log(params)

    const url = `${URI_PROD}${endpoint}${params}`;

    

    const options = {
        method,
           
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'x-token': localStorage.getItem('token')
        },
        
    }

    // console.log(options)

    if (method === 'GET') {
        return fetch(url,options);

    }

    return fetch(url, {
        method,
       
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'x-token': localStorage.getItem('token')
        },
        body: JSON.stringify(data),

    });



}

export const fetchFile = (endpoint, files, name, method = 'POST',) => {

    endpoint = endpoint === 'compras' ? 'compras/xml/upload' : `embarques/file/upload/EMBARQUES/${name ? name : ''}`

    // console.log(endpoint)

    const url = `${URI_PROD}${endpoint}`;

    const formData = new FormData();

    for (const key of Object.keys(files)) {
        formData.append('pdf', files[key])
    }


    return fetch(url, {
        method,
        headers: {
            
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },

        body: formData,




    })

}
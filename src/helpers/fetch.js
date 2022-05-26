
const URI = "http://localhost:3000/api/"


const URI_PROD = "https://backend-proscai.herokuapp.com/api/"
export const fetchSinToken = (endpoint,params, data, method = 'GET', signal) => {

    // params = params ? `?${new URLSearchParams(params)}` : '';

    const url = `${URI_PROD}${endpoint}?${new URLSearchParams(params)}` ;


    if(method === 'GET'){
        return fetch(url,{
            method,
            headers:{ 'Content-type':'application/json', 'Access-Control-Allow-Origin': '*' },
            ...signal

        });

    }

    return fetch(url,{
        method,
        headers:{ 'Content-type':'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(data),
        
    });


}

export const fetchFile = (endpoint,files,name, method ='POST',) => {

    endpoint = endpoint ==='compras' ? 'compras/xml/upload' : `embarques/file/upload/EMBARQUES/${name ? name : ''}` 

    console.log( endpoint)

    const url = `${URI_PROD}${endpoint}` ;

    const formData = new FormData();

    for(const key of Object.keys(files)){
        formData.append('pdf', files[key])
    }


    return fetch(url,{
        method,
   
        body: formData,

        
        
        
    })

}

const URI = "http://localhost:3000/api/"

const URI_PROD = "https://backend-proscai.herokuapp.com/api/"
export const fetchSinToken = (endpoint,params, data, method = 'GET') => {

    params = params ? `?${new URLSearchParams(params)}` : '';

    const url = `${URI}${endpoint}${params}` ;


    if(method === 'GET'){
        return fetch(url,{
            method,
            headers:{ 'Content-type':'application/json', 'Access-Control-Allow-Origin': '*' },

        });
    }

    return fetch(url,{
        method,
        headers:{ 'Content-type':'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(data),
        
    });


}

export const fetchFile = (endpoint,files, method ='POST') => {

    const url = `${URI}${endpoint}` ;

    const formData = new FormData();

    for(const key of Object.keys(files)){
        formData.append('pdf', files[key])
    }


    return fetch(url,{
        method,
   
        body: formData,

        
        
        
    })

}
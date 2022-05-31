import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getPdf } from '../../services/compras';



const style = {
    width: '100%',
    height: 678,

}

const Pdf = ({ fileName, type }) => {

    const [pdfFile, setPdfFile] = useState('')

    const [error, setError] = useState(false);


    useEffect(() => {


        const fetchFile = async () => {

            try {

                const response = await getPdf(type, fileName);

                setPdfFile(response)

            } catch (error) {
                console.log(error)

                setError(true)

                toast.error('Hubo un error al cargar el documento',{
                    autoClose:1000,
                    position: 'bottom-center',
                    hideProgressBar:true
                })
            }



        }

        (async () => await fetchFile())();


    }, [])


    // if(error){

    //     return (
    //         <div> Hubo un error </div>
    //     )
    // }




    return (


        <div>



            {

                error ? ''
                :

                pdfFile ?

                    <object style={{ width: '100%', height: 678, overflowY: 'hidden' }}
                        data={URL.createObjectURL(new Blob([pdfFile], { type: "application/pdf" }))}
                        type="application/pdf"

                    >


                    </object>

                    :

                    <CircularProgress size={150} style={{ position: 'absolute', bottom: 0, left: '50%' }}></CircularProgress>
            }





        </div>
    )
}

export default Pdf
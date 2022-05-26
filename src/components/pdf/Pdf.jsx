import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getPdf } from '../../services/compras';



const style = {
    width: '100%',
    height: 678,

}

const Pdf = ({ fileName, type }) => {

    const [pdfFile, setPdfFile] = useState('')

    

    useEffect(() => {


        const fetchFile = async () => {

            const response = await getPdf(type, fileName);

            setPdfFile(response)

        }

    ( async () => await fetchFile() )();


    }, [])

    


    return (


        <div>

            

            {pdfFile ?

                <object style={{ width: '100%', height: 678, overflowY: 'hidden' }}
                    data={URL.createObjectURL(new Blob([pdfFile], { type: "application/pdf" }))}
                    type="application/pdf"

                >


                </object>

                :

                <CircularProgress size={150} style={{ position: 'absolute', bottom:0, left:'50%' }}></CircularProgress>
            }





        </div>
    )
}

export default Pdf
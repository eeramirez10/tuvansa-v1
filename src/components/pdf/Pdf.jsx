import React, { useEffect, useState } from 'react';
import { getPdf } from '../../services/compras';

const style = {
    width: '100%',
    height: 678,
    
}

const Pdf = ({ factura }) => {

    const [pdfFile, setPdfFile] =  useState('')

    useEffect(()=>{

         getPdf(factura)
            .then( (file) => setPdfFile(file))
            

    },[])


    return (
        <div>

            <object style={{width:'100%', height:678, overflowY:'hidden'}}
                data={ URL.createObjectURL( new Blob([pdfFile], {  type:"application/pdf" })) }
                type="application/pdf"
              
            >

                <iframe
                    src={ URL.createObjectURL( new Blob([pdfFile], {  type:"application/pdf" })) }
                  
                >
                    <p>This browser does not support PDF!</p>
                </iframe>
            </object>

        </div>
    )
}

export default Pdf
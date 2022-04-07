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
            .then( (file) => {
                console.log(file)
                setPdfFile(file)
            })
            

    },[])

    console.log(pdfFile)


    return (
        <div>

            <object style={{width:'100%', height:678, overflowY:'hidden'}}
                data={ URL.createObjectURL( new Blob([pdfFile], {  type:"application/pdf" })) }
                type="application/pdf"
              
            >


            </object>

        </div>
    )
}

export default Pdf
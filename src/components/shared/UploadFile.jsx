
import { Button, IconButton, Paper } from '@mui/material'
import React, { createRef, useContext, useRef } from 'react'
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import { fetchFile } from '../../helpers/fetch';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { toast } from 'react-toastify';
import TableContext from '../../context/TableContext';



const UploadContainer = styled('div')({
    display: 'flex',
    padding: 30

})

const UploadFile = ({ name }) => {

    const { setFileUploaded } = useContext(TableContext)

    const [file, setFile] = React.useState([]);

    const [send, setSend] = React.useState(false)

    const fileInputRef = useRef();

    const handleInputFile = ({ target }) => {
        setFile(target.files)
        setSend(false)

        setFileUploaded(false)
    }


    const fileSubmit = async (e) => {
        e.preventDefault();

        const resp = await fetchFile('embarques', file, name);

        toast.loading()

        const body = await resp.json()

        setSend(true)

        setFileUploaded(true)

        console.log(file)

        toast.success(body.msg,{ position:"bottom-center", hideProgressBar:true, autoClose:1000 })

        // console.log(body)

    }



    return (


        <form onSubmit={fileSubmit} encType="multipart/form-data" >

            <input

                type="file"
                style={{ display: 'none' }}
                onChange={handleInputFile}
                name="file"
                ref={fileInputRef}
            />
            <IconButton
                
                aria-label="upload file"
                component="span"
                size="small"
                onClick={() => {
                    fileInputRef.current.click();
                }}
            >

                <AttachFileIcon />

            </IconButton>


            {
                !send &&
                fileInputRef.current?.files.length >= 1 &&

                <IconButton color="primary" aria-label="upload file" component="button" type='submit' size='small'>
                    <SendIcon />
                </IconButton>
            }

        </form>



    )
}

export default UploadFile
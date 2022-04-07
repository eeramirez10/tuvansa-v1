
import { Button, Paper } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import { fetchFile } from '../../helpers/fetch';

const UploadContainer = styled('div')({
    display: 'flex',
    padding: 30

})

const UploadFile = () => {

    const [file, setFile] = React.useState([]);

    const handleInputFile = ({ target }) => {
        setFile(target.files)
    }

    const fileSubmit = async (e) =>{
        e.preventDefault();
        

        const resp = await fetchFile('compras/xml/upload', file);

        const body = await resp.json()

        console.log(body)

    }


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 5 }}>


            <UploadContainer>
                <form onSubmit={fileSubmit} encType="multipart/form-data" >
                    <label htmlFor="contained-button-file">
                        <input

                            id="contained-button-file"
                            multiple
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleInputFile}
                            name="xml"
                        />
                        <Button variant="contained" component="span">
                            Upload
                        </Button>
                    </label>
                    <Button type='submit' variant="contained" endIcon={<SendIcon />} style={{ marginLeft: 10 }}>
                        Send
                    </Button>

                </form>

            </UploadContainer>

        </Paper>
    )
}

export default UploadFile
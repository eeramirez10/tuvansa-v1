import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Pdf from '../pdf/Pdf';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
};

const ModalMat = ({
    modalOpen,
    hadleModalClose,
    fileName,
    type
}) => {

    
    return (
        <div>

            <Modal
                open={modalOpen}
                onClose={hadleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Pdf fileName={ fileName } type={type} />

                    {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography> */}
                </Box>
            </Modal>
        </div>
    );
}

export default ModalMat
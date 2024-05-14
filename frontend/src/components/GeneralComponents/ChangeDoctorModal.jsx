import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { UserSignedIn } from '../../App';
import axios from 'axios';
import ChangeDoctor from '../DoctorsList/ChangeDoctor';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ChangeDoctorModal({ title, message, handleCancel, handleChangeDoctorRequest, doctorId }) {

  const { userState, dispatch } = React.useContext(UserSignedIn);
  const handleClose = () => dispatch({ type: "SET_MODAL", payload: false});

  return (
    <div>
      <Modal
        open={userState.displayModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {message}
          </Typography>
          <ChangeDoctor handleCancel={handleCancel} handleChangeDoctorRequest={handleChangeDoctorRequest} doctor_id={doctorId}/>

        </Box>
      </Modal>
    </div>
  );
}

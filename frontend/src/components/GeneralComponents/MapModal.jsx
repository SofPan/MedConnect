import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { UserSignedIn } from '../../App';
import axios from 'axios';
import ClinicListItem from '../ClinicsList/ClinicsListItem';

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

export default function MapModal({ clinic }) {

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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ClinicListItem name={clinic.name} address={clinic.address} id={clinic.id} distance={null} setErrorMessage="" />
            <Button onClick={handleClose}>Back to the list</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

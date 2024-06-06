import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UserSignedIn from './UserSignedIn';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50vw",
  height: "30vh",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const { title, message } = props;
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
        <Box sx={style} className="border-2 border-red-900 rounded-3xl">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <span className="border-b-2 border-red-900 my-2 pb-1">
              {title}
            </span>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {message}
          </Typography>
          {props.children && 
            <Box>
              {props.children}
            </Box>
          }
        </Box>
      </Modal>
    </div>
  );
}

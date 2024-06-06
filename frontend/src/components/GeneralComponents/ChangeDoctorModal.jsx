import * as React from 'react';
import ChangeDoctor from '../DoctorsList/ChangeDoctor';
import BasicModal from './BasicModal';

export default function ChangeDoctorModal({ title, message, handleCancel, handleChangeDoctorRequest, doctorId }) {

  return (
  <BasicModal title={title} message={message}>
    <ChangeDoctor handleCancel={handleCancel} handleChangeDoctorRequest={handleChangeDoctorRequest} doctor_id={doctorId}/>
  </BasicModal>

  );
}

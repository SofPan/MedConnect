import { useReducer } from "react";

export const useAppointments = () => {
  const initialState = {
    appointments: [""],
    open_appointments: [""]
  }

  const [appointmentState, dispatch] = useReducer((appointmentState, action) => {
    switch (action.type) {
      case "SET_APPOINTMENTS":
        return { ...appointmentState, appointments: action.payload }
      case "SET_OPEN_APPOINTMENTS":
        return { ...appointmentState, open_appointments: action.payload }
      case "ADD_APPOINTMENT":
        return { ...appointmentState, appointments: [...appointmentState.appointments, action.payload] }
      case "ADD_OPEN_APPOINTMENT":
        return { ...appointmentState, open_appointments: [...appointmentState.open_appointments, action.payload] }
      case "EDIT_APPOINTMENT":
        return {
          ...appointmentState, appointments: appointmentState.appointments.map(appointment => {
            if (appointment.id === action.payload.id) {
              appointment = action.payload
            }
            return appointment;
          })
        }
      case "EDIT_OPEN_APPOINTMENT":
        return {
          ...appointmentState, open_appointments: appointmentState.open_appointments.map(appointment => {
            if (appointment.id === action.payload.id) {
              appointment = action.payload
            }
            return appointment;
          })
        }
      case "DELETE_APPOINTMENT":
        return { ...appointmentState, appointments: appointmentState.appointments.filter(appointment => appointment.id !== action.payload.id) }
      case "DELETE_OPEN_APPOINTMENT":
        return { ...appointmentState, open_appointments: appointmentState.open_appointments.filter(appointment => appointment.id !== action.payload.id) }
      default:
        return appointmentState;
    }
  }, { ...initialState });

  return { appointmentState, dispatch };
}
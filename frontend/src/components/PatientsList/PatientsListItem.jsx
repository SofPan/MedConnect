import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import CardWrapper from "../GeneralComponents/CardWrapper";

const PatientsListItem = (props) => {
  const {
          name,
          date_of_birth,
          gender,
          health_card,
          doctor,
        } = props;

  const formatBirthDate = (date) => {
    return date.split("T")[0];
  };

  return (
    <Box margin={3} sx={{ width: 'calc(45% - 24px)' }}>
        <Card sx={{ width: '100%' }}>
          <CardContent>
              <Box className="border-b-2 border-red-900">
                <Typography variant="h6"><b>Name:</b> {name}</Typography>
                {date_of_birth && (
                    <Typography variant="body1"><b>Date of Birth:</b> {formatBirthDate(date_of_birth)}</Typography>
                )}
              </Box>
              <Box className="mt-4">
                <Typography variant="body1"><b>Gender:</b> {gender}</Typography>
                <Typography variant="body1"><b>Health Card:</b> {health_card}</Typography>
                <Typography variant="body1"><b>Doctor:</b> {doctor}</Typography>
              </Box>
          </CardContent>
        </Card>
    </Box>
  );
};

export default PatientsListItem;
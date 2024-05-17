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
    <Box margin={3} sx={{ width: '100%' }}>
      <CardWrapper>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6"><b>Name:</b> {name}</Typography>
              </Grid>
              {date_of_birth && (
                <Grid item xs={12}>
                  <Typography variant="body1"><b>Date of Birth:</b> {formatBirthDate(date_of_birth)}</Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography variant="body1"><b>Gender:</b> {gender}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1"><b>Health Card:</b> {health_card}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1"><b>Doctor:</b> {doctor}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </CardWrapper>
    </Box>
  );
};

export default PatientsListItem;
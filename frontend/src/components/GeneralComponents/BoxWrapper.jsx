import { Box } from "@mui/material";
import { borderColor, borderRight } from "@mui/system";
import { useEffect, useState } from "react";
import { theme } from "../../theme/theme";

const profileLeft = {
  className: "profile-left",
  width: "40%",
}

const profileRight = {
  className: "profile-right",
  width: "55%",
  marginLeft: "50px"
}

const BoxWrapper = (props) => {
  const {type} = props;

  const [boxType, setBoxType] = useState(null);

  useEffect(() => {
    type === "profileLeft" && setBoxType(profileLeft);
    type === "profileRight" && setBoxType(profileRight)
  }, [])
  /*
    type draws the constant down from above
  */ 
  return(
    <Box 
    height="100%" 
    {...boxType} 
    sx={{
      display: 'inline-flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    }}>
      {props.children}
    </Box>
  )
}

export default BoxWrapper;
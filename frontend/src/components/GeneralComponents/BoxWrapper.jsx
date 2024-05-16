import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const profileLeft = {
  className: "profile-left",
  width: "40%",
  display: "inline-block"
}

const profileRight = {
  className: "profile-right",
  width: "50%",
  display: "inline-block",
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
    <Box {...boxType}>
      {props.children}
    </Box>
  )
}

export default BoxWrapper;
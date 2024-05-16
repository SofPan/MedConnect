import { Box } from "@mui/system"

const BoxWithScroll = (props) => {

  return(
    <Box component="div" sx={{overflow: 'auto', height: props.height}} padding="36px 12px">
      {props.children}
    </Box>
  )
}

export default BoxWithScroll;
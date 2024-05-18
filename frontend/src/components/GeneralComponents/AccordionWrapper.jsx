import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails
  } from '@mui/material';
import Fade from '@mui/material/Fade';
import { theme } from '../../theme/theme';

const StyledAccordion = styled(Accordion)({
  borderColor: "rgba(128, 0, 32, 0.5)",
  color: theme.palette.primary.main,
  fontFamily: "sans-serif",
  padding: "0 15px",
  minHeight: "unset",
  '&:hover': {
    borderColor: theme.palette.primary.main,
  }
});

const StyledAccordionSummary = styled(AccordionSummary)({
  textTransform: "uppercase",
  minHeight: "unset",
  justifyContent: "center",
});

const AccordionWrapper = (props) => {
  const [expanded, setExpanded] = useState(false);

  return(
    <StyledAccordion 
      expanded={expanded} 
      onClick={() => setExpanded(!expanded)} 
    >
      <StyledAccordionSummary>{props.title}</StyledAccordionSummary>
      <AccordionDetails onClick={() => setExpanded(true)}>
        {props.children}
      </AccordionDetails>
    </StyledAccordion>
  )

}

export default AccordionWrapper;
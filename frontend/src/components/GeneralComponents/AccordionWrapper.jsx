import { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails
  } from '@mui/material';

const AccordionWrapper = (props) => {
  const [expanded, setExpanded] = useState(false);

  return(
    <Accordion expanded={expanded} onClick={() => setExpanded(true)} onSubmit={() => setExpanded(false)}>
      <AccordionSummary>{props.title}</AccordionSummary>
      <AccordionDetails onClick={() => setExpanded(true)}>
        {props.children}
      </AccordionDetails>
    </Accordion>
  )

}

export default AccordionWrapper;
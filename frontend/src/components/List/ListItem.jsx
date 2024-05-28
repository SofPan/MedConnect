import { Box } from "@mui/system";
import CardWrapper from "../GeneralComponents/CardWrapper";

const ListItem = (props) => {
  const {dataObject, cardClass} = props;

  const createListElementFromData = data => {
    const elements = [];
    for (const key in data){
      key !== "created_at" &&
        elements.push({
          key,
          value: data[key]
        });
    }
    console.log("elements", elements);
    return elements.map(element => {
      return <Box key={element.id} className={element.key}>{element.value}</Box>
    });
  }
  return(
    <li>
      <Box type="div" margin="24px auto">
        <CardWrapper className={cardClass}>
          {createListElementFromData(dataObject)}
        </CardWrapper>
      </Box>
    </li>
  )
}

export default ListItem;
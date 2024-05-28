import { useContext } from "react";
import { UserSignedIn } from "../../App";
import ListItem from "./ListItem";

const List = (props) => {
  const {
    listData
  } = props;
  console.log("listData", listData);

  const {userState} = useContext(UserSignedIn);

  const mapListItems = listData.map(data => {
    return <ListItem
              key={data.id}
              dataObject={data}
              cardClass="roster"
          />
  })
  return(
    <ul>
      {mapListItems}
    </ul>
  )
}

export default List;
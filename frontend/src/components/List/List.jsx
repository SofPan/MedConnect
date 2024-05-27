import { useContext } from "react";
import { UserSignedIn } from "../../App";
import ListItem from "./ListItem";

const List = (props) => {
  const {
    listData
  } = props;

  const {userState} = useContext(UserSignedIn);

  const mapListItems = listData.map(data => {
    return <ListItem
              key={data.id}
              dataObject={data}
          />
  })
  return(
    <ul>
      {mapListItems}
    </ul>
  )
}

export default List;
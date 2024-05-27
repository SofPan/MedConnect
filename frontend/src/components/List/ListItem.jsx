const ListItem = (props) => {
  const {dataObject} = props;

  return(
    <li>
      {dataObject.id}
    </li>
  )
}

export default ListItem;
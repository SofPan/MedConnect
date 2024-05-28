const List = (props) => {
  const {
    listItems,
    ItemComponent
  } = props;

  const mapListItems = listItems.map(data => {
    return <ItemComponent
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
const List = (props) => {
  const {
    listItems,
    ItemComponent
  } = props;

  const mapListItems = listItems.map(data => {
    return <ItemComponent
              key={data.id}
              data={data}
          />
  })
  return(
    <ul>
      {mapListItems}
    </ul>
  )
}

export default List;
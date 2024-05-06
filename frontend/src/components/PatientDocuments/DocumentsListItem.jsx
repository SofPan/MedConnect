const DocumentsListItem = (props) => {
  const {
    id,
    name,
    document,
    changeDocumentState
  } = props;

  return(
    <li>
      <img alt="X" />
      <span>{name}</span>
    </li>
  )
}

export default DocumentsListItem;
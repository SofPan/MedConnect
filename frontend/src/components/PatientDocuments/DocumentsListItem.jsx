import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const DocumentsListItem = (props) => {
  const {
    id,
    name,
    document,
    changeDocumentState
  } = props;

  return(
    <li>
      <DescriptionOutlinedIcon/>
      <span>{name}</span>
    </li>
  )
}

export default DocumentsListItem;
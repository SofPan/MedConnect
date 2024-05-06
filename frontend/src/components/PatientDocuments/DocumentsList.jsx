import DocumentsListItem from "./DocumentsListItem";

const DocumentsList = (props) => {
  const {
    patient_id,
    documents,
    changeDocumentState
  } = props;

  const mapAndFilterDocuments = documents.filter(document => {
    // Only show the Patient's documents
    return document.patient_id === patient_id
  })
  .map(document => {
    return <DocumentsListItem
            key={document.id}
            id={document.id}
            name={document.document_name}
            document={document}
            changeDocumentState={changeDocumentState}
          />
  });
  return(
    <ul>
      {mapAndFilterDocuments}
    </ul>
  )
}

export default DocumentsList;
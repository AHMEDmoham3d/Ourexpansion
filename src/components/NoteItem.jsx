function NoteItem({ note, onDelete }) {
  const renderContent = () => {
    switch (note.type) {
      case 'text':
        return <p>{note.content}</p>;
      case 'image':
        return <img src={note.content} alt="Note" style={{ maxWidth: '100%', maxHeight: '200px' }} />;
      case 'video':
        return <video controls style={{ maxWidth: '100%', maxHeight: '200px' }}><source src={note.content} /></video>;
      case 'link':
        return <a href={note.content} target="_blank" rel="noopener noreferrer">{note.content}</a>;
      case 'audio':
        return <audio controls><source src={note.content} /></audio>;
      default:
        return <p>{note.content}</p>;
    }
  };

  return (
    <div className="note-item">
      <div className="note-content">
        {renderContent()}
      </div>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default NoteItem;

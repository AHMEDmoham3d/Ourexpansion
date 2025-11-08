import { useState } from 'react';

function NoteForm({ onAddNote }) {
  const [noteType, setNoteType] = useState('text');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onAddNote({ type: noteType, content });
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <select value={noteType} onChange={(e) => setNoteType(e.target.value)}>
        <option value="text">Text</option>
        <option value="image">Image URL</option>
        <option value="video">Video URL</option>
        <option value="link">Link</option>
        <option value="audio">Audio URL</option>
      </select>
      <input
        type="text"
        placeholder={
          noteType === 'text' ? 'Enter text' :
          noteType === 'image' ? 'Enter image URL' :
          noteType === 'video' ? 'Enter video URL' :
          noteType === 'link' ? 'Enter link URL' :
          'Enter audio URL'
        }
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteForm;

import { useState } from 'react';
import NoteForm from './NoteForm';
import NoteItem from './NoteItem';

function LocationDetails({ location, onUpdateLocation, onAddNote, onDeleteNote }) {
  const [editing, setEditing] = useState(false);
  const [editedLocation, setEditedLocation] = useState(location);

  const handleSave = () => {
    onUpdateLocation(editedLocation);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedLocation(location);
    setEditing(false);
  };

  return (
    <div className="location-details">
      <h2>Location Details</h2>
      {editing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editedLocation.name}
            onChange={(e) => setEditedLocation({ ...editedLocation, name: e.target.value })}
          />
          <select
            value={editedLocation.type}
            onChange={(e) => setEditedLocation({ ...editedLocation, type: e.target.value })}
          >
            <option value="clinic">Clinic</option>
            <option value="gym">Gym</option>
            <option value="learning center">Learning Center</option>
            <option value="school">School</option>
            <option value="college">College</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className="location-info">
          <h3>{location.name}</h3>
          <p>Type: {location.type}</p>
          <p>Coordinates: {location.lat}, {location.lng}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </div>
      )}
      
      <div className="notes-section">
        <h3>Notes</h3>
        <NoteForm onAddNote={(note) => onAddNote(location.id, note)} />
        <div className="notes-list">
          {location.notes.map(note => (
            <NoteItem 
              key={note.id} 
              note={note} 
              onDelete={() => onDeleteNote(location.id, note.id)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LocationDetails;

import { useState } from 'react';

function LocationList({ locations, selectedLocation, onSelectLocation, onAddLocation, onDeleteLocation }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLocation, setNewLocation] = useState({ name: '', type: '', lat: '', lng: '' });

  const handleAddLocation = (e) => {
    e.preventDefault();
    if (newLocation.name && newLocation.type && newLocation.lat && newLocation.lng) {
      onAddLocation(newLocation);
      setNewLocation({ name: '', type: '', lat: '', lng: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="location-list">
      <h2>Locations</h2>
      <button onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Cancel' : 'Add Location'}
      </button>
      {showAddForm && (
        <form onSubmit={handleAddLocation} className="add-location-form">
          <input
            type="text"
            placeholder="Name"
            value={newLocation.name}
            onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
            required
          />
          <select
            value={newLocation.type}
            onChange={(e) => setNewLocation({ ...newLocation, type: e.target.value })}
            required
          >
            <option value="">Select Type</option>
            <option value="clinic">Clinic</option>
            <option value="gym">Gym</option>
            <option value="learning center">Learning Center</option>
            <option value="school">School</option>
            <option value="college">College</option>
          </select>
          <input
            type="number"
            step="any"
            placeholder="Latitude"
            value={newLocation.lat}
            onChange={(e) => setNewLocation({ ...newLocation, lat: e.target.value })}
            required
          />
          <input
            type="number"
            step="any"
            placeholder="Longitude"
            value={newLocation.lng}
            onChange={(e) => setNewLocation({ ...newLocation, lng: e.target.value })}
            required
          />
          <button type="submit">Add</button>
        </form>
      )}
      <ul>
        {locations.map(location => (
          <li 
            key={location.id} 
            className={selectedLocation && selectedLocation.id === location.id ? 'selected' : ''}
            onClick={() => onSelectLocation(location)}
          >
            <div className="location-info">
              <strong>{location.name}</strong>
              <span>{location.type}</span>
            </div>
            <button onClick={(e) => { e.stopPropagation(); onDeleteLocation(location.id); }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationList;

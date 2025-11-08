import { useState, useEffect } from 'react';
import MapView from './components/MapView';
import LocationList from './components/LocationList';
import LocationDetails from './components/LocationDetails';
import './App.css';

function App() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const storedLocations = localStorage.getItem('locations');
    if (storedLocations) {
      setLocations(JSON.parse(storedLocations));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('locations', JSON.stringify(locations));
  }, [locations]);

  const addLocation = (location) => {
    setLocations([...locations, { ...location, id: Date.now(), notes: [] }]);
  };

  const updateLocation = (updatedLocation) => {
    setLocations(locations.map(loc => loc.id === updatedLocation.id ? updatedLocation : loc));
  };

  const deleteLocation = (id) => {
    setLocations(locations.filter(loc => loc.id !== id));
    if (selectedLocation && selectedLocation.id === id) {
      setSelectedLocation(null);
    }
  };

  const addNote = (locationId, note) => {
    setLocations(locations.map(loc => 
      loc.id === locationId 
        ? { ...loc, notes: [...loc.notes, { ...note, id: Date.now() }] } 
        : loc
    ));
  };

  const deleteNote = (locationId, noteId) => {
    setLocations(locations.map(loc => 
      loc.id === locationId 
        ? { ...loc, notes: loc.notes.filter(note => note.id !== noteId) } 
        : loc
    ));
  };

  return (
    <div className="app">
      <header>
        <h1>Contracted Locations Manager</h1>
      </header>
      <div className="main-content">
        <div className="sidebar">
          <LocationList 
            locations={locations} 
            selectedLocation={selectedLocation} 
            onSelectLocation={setSelectedLocation} 
            onAddLocation={addLocation}
            onDeleteLocation={deleteLocation}
          />
        </div>
        <div className="content">
          {selectedLocation ? (
            <LocationDetails 
              location={selectedLocation} 
              onUpdateLocation={updateLocation}
              onAddNote={addNote}
              onDeleteNote={deleteNote}
            />
          ) : (
            <MapView 
              locations={locations} 
              onLocationClick={setSelectedLocation} 
              onAddLocation={addLocation}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

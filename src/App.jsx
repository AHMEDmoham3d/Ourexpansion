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

  const exportData = () => {
    const dataStr = JSON.stringify(locations, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'locations_data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedLocations = JSON.parse(e.target.result);
          setLocations(importedLocations);
          localStorage.setItem('locations', JSON.stringify(importedLocations));
        } catch (error) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Contracted Locations Manager</h1>
        <div className="data-controls">
          <button onClick={exportData}>Export Data</button>
          <label className="import-button">
            Import Data
            <input type="file" accept=".json" onChange={importData} style={{ display: 'none' }} />
          </label>
        </div>
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

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ onAddLocation }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const name = prompt('Enter location name:');
      if (name) {
        const type = prompt('Enter location type (clinic, gym, learning center, school, college):');
        onAddLocation({ name, type, lat, lng });
      }
    },
  });
  return null;
}

function MapView({ locations, onLocationClick, onAddLocation }) {
  return (
    <div className="map-container">
      <MapContainer center={[30.0444, 31.2357]} zoom={10} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map(location => (
          <Marker 
            key={location.id} 
            position={[location.lat, location.lng]}
            eventHandlers={{
              click: () => onLocationClick(location),
            }}
          >
            <Popup>
              <strong>{location.name}</strong><br />
              Type: {location.type}
            </Popup>
          </Marker>
        ))}
        <LocationMarker onAddLocation={onAddLocation} />
      </MapContainer>
      <p className="map-instruction">Click on the map to add a new location</p>
    </div>
  );
}

export default MapView;

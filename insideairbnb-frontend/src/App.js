import './App.css';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';


mapboxgl.accessToken = "pk.eyJ1IjoibWljaGVsbGVlMTAyIiwiYSI6ImNsdm1jd25lZzAxbGsya24xYXllZ3Y0cmQifQ.-NYVGY0GFqIxhNw6NqRbPQ";



function App() {


  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  });

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(2.349014);
  const [lat, setLat] = useState(48.864716);
  const [zoom, setZoom] = useState(11);

  return (
    <div className='container'>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;

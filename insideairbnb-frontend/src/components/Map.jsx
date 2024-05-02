import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import fetchListings from '../services/ListingService';


mapboxgl.accessToken = "pk.eyJ1IjoibWljaGVsbGVlMTAyIiwiYSI6ImNsdm1jd25lZzAxbGsya24xYXllZ3Y0cmQifQ.-NYVGY0GFqIxhNw6NqRbPQ";




function Map() {
    const [listings, setListings] = useState([]);

    const fetchData = async () => {
        try {
            const data = await fetchListings(); // Gebruik de fetchListings-functie van de service
            console.log(data);
            setListings(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        fetchListings();
    }, []);




    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(2.349014);
    const [lat, setLat] = useState(48.864716);
    const [zoom, setZoom] = useState(11);

    return (
        <div ref={mapContainer} className="map-container" />
    )
}

export default Map;
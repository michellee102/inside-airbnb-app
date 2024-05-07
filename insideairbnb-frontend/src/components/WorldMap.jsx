import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react';
import fetchListings from '../services/ListingService';


function WorldMap() {

    const [listings, setListings] = useState([]);

    const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

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

    })

    return (
        <Map
            initialViewState={{
                latitude: 48.864716,
                longitude: 2.349014,
                zoom: 11
            }}
            style={{ width: 1000, height: '100%' }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            {/* <Marker longitude={-122.4} latitude={37.8} color="red" /> */}
        </Map>
    );
}

export default WorldMap;
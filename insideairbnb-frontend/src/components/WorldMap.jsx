import { Map, Marker, Popup } from 'react-map-gl';
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

    const data = [
        { id: 1, name: 'Airbnb 1', latitude: 48.858844, longitude: 2.294351, price: 100, neighborhood: 'Marais', review: 4.5 },
        { id: 2, name: 'Airbnb 2', latitude: 48.860356, longitude: 2.319697, price: 150, neighborhood: 'Montmartre', review: 4.8 },
        { id: 3, name: 'Airbnb 3', latitude: 48.864716, longitude: 2.349014, price: 120, neighborhood: 'Saint-Germain', review: 4.2 }
    ];

    return (
        <div className='w-75'>

            <Map
                initialViewState={{
                    latitude: 48.864716,
                    longitude: 2.349014,
                    zoom: 11
                }}

                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={MAPBOX_TOKEN}

            >

            </Map>

        </div>
    );
}

export default WorldMap;
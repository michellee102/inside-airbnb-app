import { Map, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react';
import fetchListings from '../services/ListingService';


function WorldMap() {

    const [listings, setListings] = useState([]);
    const [geojson, setGeoJson] = useState({
        type: 'FeatureCollection',
        features: []
    });

    const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

    const fetchData = async () => {
        try {
            const data = await fetchListings(); // Gebruik de fetchListings-functie van de service
            setListings(data);

        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchData();
        // setGeoJson({
        //     type: 'FeatureCollection',
        //     features: [{

        //         type: 'Feature',
        //         geometry: { type: 'Point', coordinates: [23187, 4883191] },
        //     },
        //         // {

        //         //     type: 'Feature',
        //         //     geometry: { type: 'Point', coordinates: [2.3409, 48.8697] },
        //         // }
        //     ]
        // });
    }, []);

    useEffect(() => {
        if (listings.length > 0) {
            console.log("updating bish")
            const newFeatures = listings.map(listing => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [listing.longitude, listing.latitude]
                }
            }));

            setGeoJson(prevGeoJson => ({
                ...prevGeoJson,
                features: [...prevGeoJson.features, ...newFeatures]
            }));
        }
    }, [listings]);






    const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': 1,
            'circle-color': '#007cbf'
        }
    };

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
                <Source id="my-data" type="geojson" data={geojson}>
                    <Layer {...layerStyle} />
                </Source>
            </Map>

        </div>
    );
}

export default WorldMap;
import { Map, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react';
import neighbourhoodsGeojson from '../data/neighbourhoods.geojson';
import { useSelector } from 'react-redux';


function WorldMap() {
    const [sourceKey, setSourceKey] = useState(0);
    const listings = useSelector(state => state.listings.allListingsGeoLocation)
    const filteredListings = useSelector(state => state.listings.filteredListings)
    const [geojson, setGeoJson] = useState({
        type: 'FeatureCollection',
        features: []
    });
    const [neighbourhoodsJSON, setNeighbourhoodsJSON] = useState(neighbourhoodsGeojson)
    const selectedNeighbourhood = useSelector(state => state.listings.selectedNeighbourhood)


    const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;


    const dataLayer = {
        id: 'data',
        type: 'fill',
        paint: {
            'fill-color': {
                property: 'neighbourhood',
                type: 'categorical',
                stops: [
                    [selectedNeighbourhood, '#3288bd'],
                ],
                default: '#ffffff'
            },
            'fill-opacity': 0.5
        }
    };



    useEffect(() => {
        if (filteredListings.length > 0) {
            const newFeatures = filteredListings.map(listing => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [listing.longitude, listing.latitude]
                }
            }));
            setGeoJson({
                type: 'FeatureCollection',
                features: newFeatures
            });
        } else if (listings.length > 0) {
            const newFeatures = listings.map(listing => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [listing.longitude, listing.latitude]
                }
            }));
            setGeoJson({
                type: 'FeatureCollection',
                features: newFeatures
            });
        }
    }, [listings, filteredListings]);


    const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': 1,
            'circle-color': '#007cbf'
        }
    };

    useEffect(() => {
        setSourceKey(prevKey => prevKey + 1);
    }, [filteredListings]);

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
                <Source key={sourceKey} id="my-data" type="geojson" data={geojson}>
                    <Layer {...layerStyle} />
                </Source>
                {selectedNeighbourhood &&
                    <Source type='geojson' data={neighbourhoodsJSON}>
                        <Layer {...dataLayer} />
                    </Source>
                }
            </Map>


        </div>
    );
}

export default WorldMap;
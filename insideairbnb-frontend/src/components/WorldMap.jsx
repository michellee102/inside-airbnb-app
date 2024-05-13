import { Map, Source, Layer, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react';
import neighbourhoodsGeojson from '../data/neighbourhoods.geojson';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListingDetails } from '../redux/slices/listingsSlice';


function WorldMap() {
    const [sourceKey, setSourceKey] = useState(0)
    const listings = useSelector(state => state.listings.allListingsGeoLocation)
    const filteredListings = useSelector(state => state.listings.filteredListings)
    const [geojson, setGeoJson] = useState({
        type: 'FeatureCollection',
        features: []
    });
    const [neighbourhoodsJSON, setNeighbourhoodsJSON] = useState(neighbourhoodsGeojson)
    const selectedNeighbourhood = useSelector(state => state.listings.selectedNeighbourhood)
    const selectedFilters = useSelector(state => state.listings.selectedFilters)
    const [cursor, setCursor] = useState('auto')
    const popupInfo = useSelector(state => state.listings.listingDetails)

    const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    const dispatch = useDispatch();


    const dataLayer = {
        id: 'data',
        type: 'fill',
        paint: {
            'fill-color': {
                property: 'neighbourhood',
                type: 'categorical',
                stops: [
                    [selectedFilters.selectedNeighbourhood, '#a9f0fe'],
                ],
                default: '#808080'
            },
            'fill-opacity': 0.5
        }
    };


    useEffect(() => {
        if (filteredListings.length > 0) {
            updateMap(filteredListings);
        } else if (listings.length > 0) {
            updateMap(listings);
        }
    }, [listings, filteredListings]);

    const updateMap = (listings) => {
        const newFeatures = listings.map(listing => ({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [listing.longitude, listing.latitude]
            },
            properties: {
                id: listing.id,
                longitude: listing.longitude,
                latitude: listing.latitude
            }
        }));
        setGeoJson({
            type: 'FeatureCollection',
            features: newFeatures
        });
    }

    const layerStyle = {
        id: 'airbnbpoint',
        type: 'circle',
        paint: {
            'circle-radius': 2,
            'circle-color': '#007cbf'
        }
    };

    useEffect(() => {
        setSourceKey(prevKey => prevKey + 1);
    }, [filteredListings]);


    const handlePointClick = event => {
        if (event.features[0]) {
            dispatch(fetchListingDetails(event.features[0].properties.id))
        }
    };


    return (
        <div className='w-75'>
            <Map
                interactiveLayerIds={['airbnbpoint']}
                onClick={(e) => handlePointClick(e)}
                onMouseEnter={() => setCursor('pointer')}
                onMouseLeave={() => setCursor("auto")}
                cursor={cursor}
                initialViewState={{
                    latitude: 48.864716,
                    longitude: 2.349014,
                    zoom: 11
                }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                {popupInfo && <Popup
                    key={popupInfo.latitude + popupInfo.longitude}
                    longitude={popupInfo.longitude}
                    latitude={popupInfo.latitude}
                    closeOnClick={false}

                >
                    <div className='container d-flex flex-column m-0 bg-transparent   '>
                        <div className='container d-flex '>
                            <p className='text-primary m-0'>
                                <a href={popupInfo.listingUrl}>                        {popupInfo.name}</a>

                            </p>
                            <p className='me-1'>by</p>
                            <p className='text-primary m-0' > <a href={popupInfo.hostUrl}>{popupInfo.hostName}</a> </p>
                        </div>

                        <div className='container d-flex flex-column'>
                            {popupInfo.price &&
                                <p className='m-0'>{popupInfo.price} per night</p>
                            }
                            <p className='m-0'>{popupInfo.numberOfReviews} reviews</p>
                        </div>
                        
                    </div>
                </Popup>}
                <Source key={sourceKey} id="my-data" type="geojson" data={geojson} >
                    <Layer {...layerStyle} />
                </Source>
                {selectedFilters.selectedNeighbourhood &&
                    <Source type='geojson' data={neighbourhoodsJSON}>
                        <Layer {...dataLayer} />
                    </Source>
                }
            </Map>


        </div>
    );
}

export default WorldMap;
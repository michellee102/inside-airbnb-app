import { Map, Source, Layer, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react';
import neighbourhoodsGeojson from '../data/neighbourhoods.geojson';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListingDetails } from '../redux/slices/listingsSlice';


function WorldMap() {
    const [sourceKey, setSourceKey] = useState(0)
    const [cursor, setCursor] = useState('auto')
    const dispatch = useDispatch();
    const listings = useSelector(state => state.listings.allListingsGeoLocation)
    const filteredListings = useSelector(state => state.listings.filteredListings)
    const [geojson, setGeoJson] = useState({
        type: 'FeatureCollection',
        features: []
    });
    const selectedFilters = useSelector(state => state.listings.selectedFilters)
    const popupInfo = useSelector(state => state.listings.listingDetails)
    const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    const START_LATITUDE_PARIS = 48.864716;
    const START_LONGITUDE_PARIS = 2.349014;
    const START_ZOOM = 11;
    const LISTINGS_CIRCLE_COLOR = "#007cbf";
    const LISTINGS_CIRCLE_RADIUS = 2;
    const accessToken = useSelector(state => state.listings.accessToken)


    useEffect(() => {
        console.log("popop" + popupInfo)
    }
        , [popupInfo]);

    const DATA_LAYER = {
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

    const LAYER_STYLE = {
        id: 'airbnbpoint',
        type: 'circle',
        paint: {
            'circle-radius': LISTINGS_CIRCLE_RADIUS,
            'circle-color': LISTINGS_CIRCLE_COLOR
        }
    };

    const CLUSTER_LAYER = {
        id: 'clusters',
        type: 'circle',
        source: 'my-data',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                'rgba(81, 187, 214, 0.5)', // Light blue with 80% opacity
                100,
                'rgba(107, 150, 174, 0.5)', // Light grey with 80% opacity
                750,
                'rgba(87, 123, 142, 0.5)' // Dark grey with 80% opacity
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100,
                30,
                750,
                40
            ]
        }
    };


    const CLUSTER_COUNT_LAYER = {
        id: 'cluster-count',
        type: 'symbol',
        source: 'my-data',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    };

    const UNCLUSTERED_POINT_LAYER = {
        id: 'unclustered-point',
        type: 'circle',
        source: 'my-data',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    };

    useEffect(() => {
        const isAnyFilterSelected = Object.values(selectedFilters).some(value => value !== null);
        if (isAnyFilterSelected) {
            console.log("filtered listings" + filteredListings)
            updateMap(filteredListings);
        } else if (listings.length > 0) {
            console.log("listings" + listings)
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

    useEffect(() => {
        setSourceKey(prevKey => prevKey + 1);
    }, [filteredListings]);


    const handlePointClick = event => {
        if (event.features[0]) {
            const listingId = event.features[0].properties.id
            dispatch(fetchListingDetails({ listingId, accessToken }))
        }
    };

    return (
        <div className='w-100'>
            <Map
                interactiveLayerIds={['airbnbpoint']}
                onClick={(e) => handlePointClick(e)}
                onMouseEnter={() => setCursor('pointer')}
                onMouseLeave={() => setCursor("auto")}
                cursor={cursor}
                initialViewState={{
                    latitude: START_LATITUDE_PARIS,
                    longitude: START_LONGITUDE_PARIS,
                    zoom: START_ZOOM
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
                                <a href={popupInfo.listingUrl}>{popupInfo.name}</a>
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
                <Source
                    key={sourceKey}
                    id="my-data"
                    type="geojson"
                    data={geojson}
                    cluster={true}
                    clusterMaxZoom={14}
                    clusterRadius={50}
                >
                    <Layer {...LAYER_STYLE} />
                    <Layer {...CLUSTER_LAYER} />
                    <Layer {...CLUSTER_COUNT_LAYER} />
                    <Layer {...UNCLUSTERED_POINT_LAYER} />
                </Source>
                {selectedFilters.selectedNeighbourhood &&
                    <Source type='geojson' data={neighbourhoodsGeojson}>
                        <Layer {...DATA_LAYER} />
                    </Source>
                }
            </Map>
        </div>
    );
}

export default WorldMap;
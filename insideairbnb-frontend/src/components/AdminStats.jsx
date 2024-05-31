import Dropdown from 'react-bootstrap/Dropdown';
import { Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import BarChart from './BarChart';
import { useEffect, useState } from 'react';
import { fetchAverageNightsPerMonth, fetchTotalRevenue, fetchAverageRating } from '../redux/slices/listingsSlice';

function SortComponent() {
    const dispatch = useDispatch();
    const neighbourhoodNames = useSelector(state => state.listings.neighbourhoods);

    const [selectedNeighbourhood, setSelectedNeighbourhood] = useState(null);
    const accessToken = useSelector(state => state.listings.accessToken);

    const [showStatistics, setShowStatistics] = useState(false);

    const [months, setMonths] = useState([]);
    const [averageNights, setAverageNights] = useState([]);
    const [loadingNights, setLoadingNights] = useState(false);
    const [nightsFetched, setNightsFetched] = useState(false);

    const [totalRevenue, setTotalRevenue] = useState([]);
    const [totalRevenueMonths, setTotalRevenueMonths] = useState([]);
    const [loadingRevenue, setLoadingRevenue] = useState(false);
    const [revenueFetched, setRevenueFetched] = useState(false);

    const [neighbourhoods, setNeighbourhoods] = useState([]);
    const [averageRatings, setAverageRatings] = useState([]);
    const [loadingRatings, setLoadingRatings] = useState(false);
    const [ratingsFetched, setRatingsFetched] = useState(false);

    useEffect(() => {
        if (neighbourhoodNames.length > 0) {
            setSelectedNeighbourhood(neighbourhoodNames[0].neighbourhoodname);
        }
    }, [neighbourhoodNames]);

    useEffect(() => {
        if (accessToken && showStatistics && !nightsFetched) {
            setLoadingNights(true);
            dispatch(fetchAverageNightsPerMonth(accessToken))
                .then((data) => {
                    if (data.payload) {
                        const monthsArray = data.payload.map((item) => item.month);
                        const averageNightsArray = data.payload.map((item) => item.averageNights);
                        setMonths(monthsArray);
                        setAverageNights(averageNightsArray);
                        setNightsFetched(true);
                    } else {
                        console.error("fetchAverageNightsPerMonth returned no payload", data);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching average nights per month:", error);
                })
                .finally(() => {
                    setLoadingNights(false);
                });
        }
    }, [accessToken, showStatistics, nightsFetched, dispatch]);

    useEffect(() => {
        if (selectedNeighbourhood && accessToken && showStatistics && !revenueFetched) {
            setLoadingRevenue(true);
            dispatch(fetchTotalRevenue({ neighbourhood: selectedNeighbourhood, accessToken }))
                .then((data) => {
                    if (data.payload) {
                        const monthsArray = data.payload.map((item) => item.month);
                        const totalRev = data.payload.map((item) => item.totalRevenue);
                        setTotalRevenueMonths(monthsArray);
                        setTotalRevenue(totalRev);
                        setRevenueFetched(true);
                    } else {
                        console.error("fetchTotalRevenue returned no payload", data);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching total revenue:", error);
                })
                .finally(() => {
                    setLoadingRevenue(false);
                });
        }
    }, [selectedNeighbourhood, accessToken, showStatistics, revenueFetched, dispatch]);

    useEffect(() => {
        if (accessToken && showStatistics && !ratingsFetched) {
            setLoadingRatings(true);
            dispatch(fetchAverageRating(accessToken))
                .then((data) => {
                    if (data.payload) {
                        const neighbourhoodsForRatings = data.payload.map((item) => item.neighbourhood);
                        const ratings = data.payload.map((item) => item.averageRating);
                        setNeighbourhoods(neighbourhoodsForRatings);
                        setAverageRatings(ratings);
                        setRatingsFetched(true);
                    } else {
                        console.error("fetchAverageRating returned no payload", data);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching average ratings:", error);
                })
                .finally(() => {
                    setLoadingRatings(false);
                });
        }
    }, [accessToken, showStatistics, ratingsFetched, dispatch]);

    return (
        <div className='container ' style={{ maxHeight: 'calc(100vh - 310px)', overflowY: 'auto' }}>
            <div className='container d-flex flex-column '>
                <Button onClick={() => setShowStatistics(!showStatistics)} className="mb-3 btn-info mt-2">
                    {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
                </Button>
                {showStatistics && (
                    <div className="container-fluid p-0 m-0 align-items-center justify-content-center">
                        {/* First BarChart */}
                        <div className="row">
                            <div className="col d-flex flex-column justify-content-center align-items-center">
                                <h4>Average booked nights per month</h4>
                                {loadingNights ? (
                                    <Spinner animation="border" />
                                ) : (
                                    <BarChart labels={months} dataValues={averageNights} title="Average booked nights per month" />
                                )}
                            </div>
                        </div>
                        {/* Divider line */}
                        <hr />
                        {/* Second BarChart */}
                        <div className='d-flex flex-column justify-content-center align-items-center p-0 m-0'>
                            <h4>Total revenue per neighbourhood per month</h4>
                            <Dropdown className='p-2'>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {selectedNeighbourhood || 'Neighbourhood'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='ScrollDropdown'>
                                    {neighbourhoodNames.map((neighbourhood) => (
                                        <Dropdown.Item
                                            className='text-dark'
                                            key={neighbourhood.neighbourhoodname}
                                            onClick={() => setSelectedNeighbourhood(neighbourhood.neighbourhoodname)}
                                        >
                                            {neighbourhood.neighbourhoodname}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        {/* Second BarChart */}
                        <div className="row">
                            <div className="col">
                                {loadingRevenue ? (
                                    <Spinner animation="border" />
                                ) : (
                                    <BarChart labels={totalRevenueMonths} dataValues={totalRevenue}
                                        title={`Revenue in ${selectedNeighbourhood} per month`}
                                        dollarSignTooltip={true}
                                    />
                                )}
                            </div>
                        </div>
                        {/* Divider line */}
                        <hr />
                        {/* Third BarChart */}
                        <div className="row">
                            <div className="col d-flex flex-column justify-content-center align-items-center">
                                <h4>Average ratings per neighbourhood</h4>
                                {loadingRatings ? (
                                    <Spinner animation="border" />
                                ) : (
                                    <BarChart labels={neighbourhoods} dataValues={averageRatings} title="Average Ratings" yTitle="Amount of stars"
                                        xAxisLabelSize={12}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SortComponent;

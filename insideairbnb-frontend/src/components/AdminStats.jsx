import Dropdown from 'react-bootstrap/Dropdown';
import { Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import BarChart from './BarChart';
import { useEffect, useState } from 'react';
import { fetchAverageNightsPerMonth, fetchTotalRevenue, fetchAverageRating } from '../redux/slices/statsSlice';
import DoughnutChart from './DoughnutChart';

function SortComponent() {
    const dispatch = useDispatch();

    const selectedNeighbourhood = useSelector(state => state.listings.selectedFilters.selectedNeighbourhood);
    const accessToken = useSelector(state => state.listings.accessToken);
    const filters = useSelector(state => state.listings.selectedFilters);

    const [showStatistics, setShowStatistics] = useState(false);

    const [monthsData, setMonthsData] = useState({
        months: [],
        averageNights: [],
        loading: false,
        fetched: false,
    });

    const [revenueData, setRevenueData] = useState({
        totalRevenueMonths: [],
        totalRevenue: [],
        loading: false,
        fetched: false,
    });

    const [ratingData, setRatingData] = useState({
        averageRating: [],
        loading: false,
        fetched: false,
    });

    const [previousFilters, setPreviousFilters] = useState({});

    const haveFiltersChanged = (currentFilters, previousFilters) => {
        return JSON.stringify(currentFilters) !== JSON.stringify(previousFilters);
    };

    useEffect(() => {
        if (accessToken && showStatistics) {
            if (!monthsData.fetched || haveFiltersChanged(filters, previousFilters)) {
                setMonthsData(prevData => ({ ...prevData, loading: true }));
                dispatch(fetchAverageNightsPerMonth({ filters, accessToken }))
                    .then((data) => {
                        if (data.payload) {
                            const monthsArray = data.payload.map((item) => item.month);
                            const averageNightsArray = data.payload.map((item) => item.averageNights);
                            setMonthsData({
                                months: monthsArray,
                                averageNights: averageNightsArray,
                                loading: false,
                                fetched: true,
                            });
                            setPreviousFilters(filters);
                        } else {
                            console.error("fetchAverageNightsPerMonth returned no payload", data);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching average nights per month:", error);
                    });
            }
        }
    }, [accessToken, showStatistics, monthsData.fetched, filters, previousFilters, dispatch]);

    useEffect(() => {
        if (accessToken && showStatistics) {
            if (!revenueData.fetched || haveFiltersChanged(filters, previousFilters)) {
                setRevenueData(prevData => ({ ...prevData, loading: true }));
                dispatch(fetchTotalRevenue({ filters, accessToken }))
                    .then((data) => {
                        if (data.payload) {
                            const monthsArray = data.payload.map((item) => item.month);
                            const totalRev = data.payload.map((item) => item.totalRevenue);
                            setRevenueData({
                                totalRevenueMonths: monthsArray,
                                totalRevenue: totalRev,
                                loading: false,
                                fetched: true,
                            });
                            setPreviousFilters(filters);
                        } else {
                            console.error("fetchTotalRevenue returned no payload", data);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching total revenue:", error);
                    });
            }
        }
    }, [selectedNeighbourhood, accessToken, showStatistics, revenueData.fetched, filters, previousFilters, dispatch]);

    useEffect(() => {
        if (accessToken && showStatistics) {
            if (!ratingData.fetched || haveFiltersChanged(filters, previousFilters)) {
                setRatingData(prevData => ({ ...prevData, loading: true }));
                dispatch(fetchAverageRating({ filters, accessToken }))
                    .then(({ payload }) => {
                        if (payload) {
                            setRatingData({
                                averageRating: [payload.rating],
                                loading: false,
                                fetched: true,
                            });
                            setPreviousFilters(filters);
                        }
                    })
                    .catch(error => {
                        console.error("Failed to fetch average rating:", error);
                    });
            }
        }
    }, [accessToken, filters, showStatistics, dispatch]);


    return (
        <div className='container ' style={{ maxHeight: 'calc(100vh - 330px)', overflowY: 'auto' }}>
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
                                {monthsData.loading ? (
                                    <Spinner animation="border" />
                                ) : (
                                    <BarChart labels={monthsData.months} dataValues={monthsData.averageNights} title="Average booked nights per month" />
                                )}
                            </div>
                        </div>
                        {/* Divider line */}
                        <hr />
                        {/* Second BarChart */}
                        <div className='d-flex flex-column justify-content-center align-items-center p-0 m-0'>
                            <h4>Total revenue per month</h4>

                        </div>
                        {/* Second BarChart */}
                        <div className="row">
                            <div className="col">
                                {revenueData.loading ? (
                                    <Spinner animation="border" />
                                ) : (
                                    <BarChart labels={revenueData.totalRevenueMonths} dataValues={revenueData.totalRevenue}
                                        title={`Revenue in ${selectedNeighbourhood ? selectedNeighbourhood : 'Paris'} per month`}
                                        dollarSignTooltip={true}
                                    />
                                )}
                            </div>
                        </div>
                        {/* Divider line */}
                        <hr />
                        {/* Third BarChart */}
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-auto d-flex flex-column justify-content-center align-items-center">
                                <h4 className='p-0 m-0'>Average rating</h4>
                                {ratingData.loading ? (
                                    <Spinner animation="border" />
                                ) : (
                                    <DoughnutChart labels={["Average rating"]} dataValues={ratingData.averageRating}
                                        title={`Average star rating out of 5 in ${selectedNeighbourhood ? selectedNeighbourhood : 'Paris'} `}
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

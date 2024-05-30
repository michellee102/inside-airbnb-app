import Dropdown from 'react-bootstrap/Dropdown';
import { Container, Row, Col } from 'react-bootstrap';
import { fetchSortedListings } from '../redux/slices/listingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import BarChart from './BarChart';
import { useEffect, useState } from 'react';
import { fetchAverageNightsPerMonth, fetchTotalRevenue, fetchAverageRating } from '../redux/slices/listingsSlice';
import DoughnutChart from './DoughnutChart';


function SortComponent() {
    const dispatch = useDispatch();
    const neighbourhoodNames = useSelector(state => state.listings.neighbourhoods)
    const defaultNeighbourhood = neighbourhoodNames.length > 0 ? neighbourhoodNames[0].neighbourhoodname : null;
    const [selectedNeighbourhood, setSelectedNeighbourhood] = useState(defaultNeighbourhood);

    const filteredListings = useSelector((state) => state.listings.sortedListings);
    const handleSortSelection = (sortType) => {
        dispatch(fetchSortedListings(sortType));
    };
    const [months, setMonths] = useState([]);
    const [averageNights, setAverageNights] = useState([]);

    const [totalRevenue, setTotalRevenue] = useState([]);
    const [totalRevenueMonths, setTotalRevenueMonths] = useState([]);

    const [neighbourhoods, setNeighbourhoods] = useState([]);
    const [averageRatings, setAverageRatings] = useState([]);
    const years = ["2023", "2024"];

    useEffect(() => {
        dispatch(fetchAverageNightsPerMonth())
            .then((data) => {
                const monthsArray = data.payload.map((item) => item.month);
                const averageNightsArray = data.payload.map((item) => item.averageNights);
                setMonths(monthsArray);
                setAverageNights(averageNightsArray);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (selectedNeighbourhood) {
            dispatch(fetchTotalRevenue(selectedNeighbourhood))
                .then((data) => {
                    console.log(data.payload);
                    const monthsArray = data.payload.map((item) => item.month);
                    const totalRev = data.payload.map((item) => item.totalRevenue);
                    setTotalRevenueMonths(monthsArray);
                    setTotalRevenue(totalRev);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedNeighbourhood]);


    useEffect(() => {
        dispatch(fetchAverageRating())
            .then((data) => {
                console.log(data.payload);
                const neighbourhoodsForRatings = data.payload.map((item) => item.neighbourhood);
                const ratings = data.payload.map((item) => item.averageRating);
                setNeighbourhoods(neighbourhoodsForRatings);
                setAverageRatings(ratings);
                console.log(neighbourhoods);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <div className='container'>
           

            <div className="container-fluid">
                {/* First BarChart */}
                <div className="row">
                    <div className="col">
                        <h4>Average booked nights</h4>
                        <BarChart labels={months} dataValues={averageNights} title="Average booked nights per month" />
                    </div>
                </div>

                {/* Second BarChart */}
                <div className='d-flex justify-content-center align-items-center'>
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
                <div className="row">
                    <div className="col">
                        <h4>Total revenue</h4>
                        <BarChart labels={totalRevenueMonths} dataValues={totalRevenue}
                            title={`Revenue in ${selectedNeighbourhood} per month`}
                            dollarSignTooltip={true}
                        />
                    </div>
                </div>

                {/* Third BarChart */}
                <div className="row">
                    <div className="col">
                        <h4>Average Ratings</h4>
                        <BarChart labels={neighbourhoods} dataValues={averageRatings} title="Average Ratings" yTitle="Amount of stars"
                            xAxisLabelSize={12}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SortComponent;

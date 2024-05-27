
import Dropdown from 'react-bootstrap/Dropdown';
import CloseButton from 'react-bootstrap/CloseButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setSelectedNeighbourhood, fetchListingsByFilters, setSelectedReview, resetFilters, setMaxPriceFilter } from '../redux/slices/listingsSlice';
import { getNeighbourhoods } from '../services/ListingService';
import Form from 'react-bootstrap/Form';

function FilterListings() {
    const dispatch = useDispatch();
    const [maxPrice, setMaxPrice] = useState('');
    const selectedFilters = useSelector(state => state.listings.selectedFilters)
    const [neighbourhoodNames, setNeighbourhoodNames] = useState([])
    const totalListingsAmount = useSelector(state => state.listings.allListingsGeoLocation.length)
    const filteredListingsAmount = useSelector(state => state.listings.filteredListings.length)
    const REVIEW_STARS = [1, 2, 3, 4, 5];

    const fetchNeighboorhoodNames = async () => {
        try {
            const data = await getNeighbourhoods();
            setNeighbourhoodNames(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handlePriceChange = (event) => {
        setMaxPrice(event.target.value);
        console.log(maxPrice)
    };

    //bla

    useEffect(() => {
        fetchNeighboorhoodNames();
    }, [])


    const handleNeighbourhoodClick = (neighbourhood) => {
        dispatch(setSelectedNeighbourhood(neighbourhood))
        dispatch(fetchListingsByFilters({
            neighbourhood: neighbourhood,
            review: selectedFilters.selectedReview,
            maxPrice: selectedFilters.maxPrice
        }))
    }

    const handleReviewClick = (review) => {
        dispatch(setSelectedReview(review))
        dispatch(fetchListingsByFilters({
            neighbourhood: selectedFilters.selectedNeighbourhood,
            review: review,
            maxPrice: selectedFilters.maxPrice
        }))
    }

    const handlePriceSubmit = (price) => {
        console.log("jajaja" + price)
        dispatch(setMaxPriceFilter(price))
        dispatch(fetchListingsByFilters({
            neighbourhood: selectedFilters.selectedNeighbourhood,
            review: selectedFilters.selectedReview,
            maxPrice: price
        }))
    }

    const handleResetFilters = () => {
        dispatch(resetFilters())
        setMaxPrice('')
    }



    return (
        <div className='d-flex justify-content-between align-items-center'>
            <div>
                <div className='d-flex'>
                    <p className='m-0'>
                        Filter by:
                    </p>
                    {(selectedFilters.selectedNeighbourhood || selectedFilters.selectedReview) && <CloseButton onClick={handleResetFilters} />}
                </div>
                {/* FILTER NEIGHBOURHOODS */}
                <Dropdown className='p-2'>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {selectedFilters.selectedNeighbourhood ? selectedFilters.selectedNeighbourhood : 'Neighbourhood'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='ScrollDropdown'>
                        {neighbourhoodNames.map((neighbourhood) => (
                            <Dropdown.Item
                                className='text-dark'
                                key={neighbourhood.neighbourhoodname}
                                onClick={() => {
                                    handleNeighbourhoodClick(neighbourhood.neighbourhoodname)
                                }}>
                                {neighbourhood.neighbourhoodname}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                {/* FILTER REVIEWS */}
                <Dropdown className='p-2'>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {selectedFilters.selectedReview ? selectedFilters.selectedReview : 'Stars'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='ScrollDropdown'>
                        {REVIEW_STARS.map((item, index) => (
                            <Dropdown.Item
                                onClick={() => handleReviewClick(item)}
                                key={index}>{item}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                {/* Add a submit button for the max price */}
                <div className='d-flex '>

                    <Form>
                        <Form.Group className='p-2'>
                            <Form.Control
                                type="text"
                                placeholder="Max price"
                                value={maxPrice} // Waarde van het invoerveld
                                onChange={handlePriceChange} // Functie om de waarde bij te werken
                            />
                        </Form.Group>
                    </Form>
                    <button
                        onClick={() => handlePriceSubmit(maxPrice)}
                        className='btn btn-primary p-0 '>Submit price</button>
                </div>
            </div>
            <div>
                <p className='m-0 p-0'>total listings:</p>
                <p className='h2 m-0 fw-bold'>
                    {totalListingsAmount !== 0 && (
                        selectedFilters.selectedNeighbourhood === null && selectedFilters.selectedReview === null
                            ? totalListingsAmount
                            : filteredListingsAmount !== 0
                                ? filteredListingsAmount
                                : null
                    )}
                </p>
            </div>
        </div>
    )
}


export default FilterListings;
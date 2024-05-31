
import Dropdown from 'react-bootstrap/Dropdown';
import CloseButton from 'react-bootstrap/CloseButton';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setSelectedNeighbourhood, fetchListingsByFilters, setSelectedReview, resetFilters, setPriceFilter } from '../redux/slices/listingsSlice';
import Form from 'react-bootstrap/Form';

function FilterListings() {
    const dispatch = useDispatch();
    const [maxPrice, setMaxPrice] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const selectedFilters = useSelector(state => state.listings.selectedFilters)
    const neighbourhoodNames = useSelector(state => state.listings.neighbourhoods)
    const totalListingsAmount = useSelector(state => state.listings.allListingsGeoLocation.length)
    const filteredListingsAmount = useSelector(state => state.listings.filteredListings.length)
    const accessToken = useSelector(state => state.listings.accessToken)
    const REVIEW_STARS = [1, 2, 3, 4, 5];


    const handleNeighbourhoodClick = (neighbourhood) => {
        dispatch(setSelectedNeighbourhood(neighbourhood))
        dispatch(fetchListingsByFilters({
            neighbourhood: neighbourhood,
            review: selectedFilters.selectedReview,
            minPrice: selectedFilters.minPrice,
            maxPrice: selectedFilters.maxPrice,
        }, accessToken))
    }

    const handleReviewClick = (review) => {
        dispatch(setSelectedReview(review))
        dispatch(fetchListingsByFilters({
            neighbourhood: selectedFilters.selectedNeighbourhood,
            review: review,
            minPrice: selectedFilters.minPrice,
            maxPrice: selectedFilters.maxPrice,

        }, accessToken))
    }

    const handlePriceSubmit = () => {
        dispatch(setPriceFilter({ minPrice, maxPrice }))

        dispatch(fetchListingsByFilters({
            neighbourhood: selectedFilters.selectedNeighbourhood,
            review: selectedFilters.selectedReview,
            minPrice: minPrice,
            maxPrice: maxPrice
        }, accessToken))
    }

    const handleResetFilters = () => {
        setMaxPrice('')
        setMinPrice('')
        dispatch(resetFilters())
    }



    return (
        <div className='d-flex justify-content-between align-items-center'>
            <div className='w-100'>
                <div className='d-flex'>
                    <p className='m-0'>
                        Filter by:
                    </p>
                    {(selectedFilters.selectedNeighbourhood || selectedFilters.selectedReview || selectedFilters.maxPrice || selectedFilters.minPrice) && <CloseButton onClick={handleResetFilters} />}
                </div>
                {/* FILTER NEIGHBOURHOODS */}
                <div className='d-flex justify-content-between'>
                    <div>
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
                    </div>

                    <div >
                        <p className='m-0 p-0 fs-3'>total listings:</p>
                        <p className='fs-1 m-0 fw-bold'>
                            {totalListingsAmount !== 0 && (
                                selectedFilters.selectedNeighbourhood === null && selectedFilters.selectedReview === null && selectedFilters.maxPrice === null && selectedFilters.minPrice === null
                                    ? totalListingsAmount
                                    : filteredListingsAmount !== 0
                                        ? filteredListingsAmount
                                        : 0
                            )}
                        </p>
                    </div>
                </div>
                <div className='d-flex gap-1 justify-content-center align-items-center'>

                    <div className='d-flex  '>
                        <Form.Group className='p-2 w-50'>
                            <Form.Control
                                type="text"
                                placeholder="Min price"
                                value={minPrice}
                                onChange={(event) => setMinPrice(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='p-2 w-50'>
                            <Form.Control
                                type="text"
                                placeholder="Max price"
                                value={maxPrice}
                                onChange={(event) => setMaxPrice(event.target.value)}
                            />
                        </Form.Group>
                    </div>


                    <button
                        onClick={() => handlePriceSubmit()}
                        className='btn btn-primary p-2 w-50 h-25 '
                    >
                        Submit price
                    </button>

                </div>
            </div>

        </div>
    )
}


export default FilterListings;
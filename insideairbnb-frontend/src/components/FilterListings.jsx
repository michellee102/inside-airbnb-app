
import Dropdown from 'react-bootstrap/Dropdown';
import CloseButton from 'react-bootstrap/CloseButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setSelectedNeighbourhood, fetchListingsByFilters, setSelectedReview, resetFilters } from '../redux/slices/listingsSlice';
import { getNeighbourhoods } from '../services/ListingService';

function FilterListings() {
    const dispatch = useDispatch();
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

    //bla

    useEffect(() => {
        fetchNeighboorhoodNames();
    }, [])


    const handleNeighbourhoodClick = (neighbourhood) => {
        dispatch(setSelectedNeighbourhood(neighbourhood))
        dispatch(fetchListingsByFilters({
            neighbourhood: neighbourhood,
            review: selectedFilters.selectedReview
        }))
    }

    const handleReviewClick = (review) => {
        dispatch(setSelectedReview(review))
        dispatch(fetchListingsByFilters({
            neighbourhood: selectedFilters.selectedNeighbourhood,
            review: review
        }))
    }

    const handleResetFilters = () => {
        dispatch(resetFilters())
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
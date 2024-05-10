import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import CloseButton from 'react-bootstrap/CloseButton';
import { getNeighbourhoods } from '../services/ListingService';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedNeighbourhood, fetchListingsByNeighbourhood } from '../redux/slices/listingsSlice';


function DetailedInfo() {
    const dispatch = useDispatch();
    const handleNeighbourhoodSelect = (neighbourhood) => {
        dispatch(setSelectedNeighbourhood(neighbourhood))
        dispatch(fetchListingsByNeighbourhood(neighbourhood))
    }
    const selectedNeighbourhood = useSelector((state) => state.listings.selectedNeighbourhood)
    const [neighbourhoodNames, setNeighbourhoodNames] = useState([])

    const fetchNeighboorhoodNames = async () => {
        try {
            const data = await getNeighbourhoods();
            setNeighbourhoodNames(data);

        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchNeighboorhoodNames();
    }, [])




    return (
        <div className="container d-flex flex-column detailed-bg-color bg-gradient w-25 ">
            <p className="d-flex justify-content-center p-3 fs-3">
                Paris
            </p>
            <p className='m-0'>
                Filter by:
            </p>
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {selectedNeighbourhood ? selectedNeighbourhood : 'Neighbourhood'}
                </Dropdown.Toggle>
                {selectedNeighbourhood && <CloseButton onClick={() => dispatch(setSelectedNeighbourhood(null))} />}
                <Dropdown.Menu className='ScrollDropdown'>
                    {neighbourhoodNames.map((neighbourhood) => (
                        <Dropdown.Item
                            className='text-dark'
                            key={neighbourhood.neighbourhoodname}
                            onClick={() => {
                                handleNeighbourhoodSelect(neighbourhood.neighbourhoodname)
                            }
                            }
                        >
                            {neighbourhood.neighbourhoodname}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default DetailedInfo;
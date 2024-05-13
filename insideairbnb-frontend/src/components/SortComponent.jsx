import Dropdown from 'react-bootstrap/Dropdown';
import { fetchSortedListings } from '../redux/slices/listingsSlice';
import { useDispatch, useSelector } from 'react-redux';


function SortComponent() {
    const dispatch = useDispatch();
    const filteredListings = useSelector((state) => state.listings.sortedListings);
    const status = useSelector((state) => state.listings.status);

    const handleSortSelection = (sortType) => {
        dispatch(fetchSortedListings(sortType));
    };

    return (
        <div className='d-flex flex-column justify-content-between align-items-center'>

            <Dropdown className='p-2'>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    sort by:
                </Dropdown.Toggle>

                <Dropdown.Menu className='ScrollDropdown'>
                    <Dropdown.Item onClick={() => handleSortSelection('lowtohigh')}>Low to high</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortSelection('hightolow')}>High to low</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>


            {filteredListings.length > 0 ? (
                <div className='ScrollDropdown'>
                    <table className="table  ">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">B&B name</th>
                                <th scope="col">Host</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody className=' h-50 overflow-auto'>
                            {filteredListings.slice(0, 20).map((listing, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td><a href={listing.listingUrl}>  {listing.name} </a></td>
                                    <td> <a href={listing.hostUrl}>{listing.hostName}</a></td>
                                    <td>{listing.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : <p>ja ni best</p>}

        </div>
    );
}

export default SortComponent;
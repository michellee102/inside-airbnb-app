
import FilterListings from './FilterListings';
import AdminStats from './AdminStats';

function DetailedInfo() {
    return (
        <div className="container d-flex flex-column detailed-bg-color bg-gradient w-25 ">
            <p className="d-flex justify-content-center p-3 fs-3">
                Paris
            </p>
            <FilterListings />
            <AdminStats />
        </div>
    );
}

export default DetailedInfo;
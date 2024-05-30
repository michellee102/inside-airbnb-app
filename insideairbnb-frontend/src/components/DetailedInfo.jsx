import FilterListings from './FilterListings';
import AdminStats from './AdminStats';
import { decodeJWT } from '../helpers/JWTDecoder';
import { useState, useEffect } from 'react';

function DetailedInfo({ accessToken }) {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (accessToken) {
            console.log("Access token:", accessToken);
            const decodedToken = decodeJWT(accessToken);
            console.log("Decoded token:", decodedToken);
            // Access the permissions
            const permissions = decodedToken.permissions || [];
            if (permissions.includes("read:stats")) {
                setIsAdmin(true);
            }
        }
    }, [accessToken]);

    return (
        <div className="container d-flex flex-column detailed-bg-color bg-gradient " >
            <p className="d-flex justify-content-center p-3 fs-3">
                Paris
            </p>
            <FilterListings />
            {isAdmin && <AdminStats />}
        </div>
    );
}

export default DetailedInfo;

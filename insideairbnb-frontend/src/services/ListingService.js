const fetchListings = async () => {
    try {
        const response = await fetch('https://localhost:7049/Listings/geoinfo');
        if (!response.ok) {
            throw new Error('Er is een fout opgetreden bij het ophalen van de lijsten.');
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

const fetchListingsByNeighbourhood = async (neighbourhood) => {
    try {
        const response = await fetch(`https://localhost:7049/Listings/${neighbourhood}`);
        if (!response.ok) {
            throw new Error('Er is een fout opgetreden bij het ophalen van de lijsten.');
        }
        return await response.json();

    } catch (error) {
        throw new Error(error.message);
    }
};

const getNeighbourhoods = async () => {
    try {
        const response = await fetch('https://localhost:7049/Neighbourhoods');
        if (!response.ok) {
            throw new Error('Er is een fout opgetreden bij het ophalen van de lijsten.');
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export { fetchListings, getNeighbourhoods, fetchListingsByNeighbourhood };
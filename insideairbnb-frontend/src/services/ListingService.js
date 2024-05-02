const fetchListings = async () => {
    try {
        const response = await fetch('https://localhost:7049/Listings');
        if (!response.ok) {
            throw new Error('Er is een fout opgetreden bij het ophalen van de lijsten.');
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export default fetchListings;

// Utility function to generate fetch URL based on parameters
export const generateFetchUrl = (endpoint, params) => {
    const { selectedNeighbourhood, selectedReview, minPrice, maxPrice } = params;
    console.log("poepe" + params)
    const baseURL = 'https://localhost:7049/';
    const neighbourhoodParam = selectedNeighbourhood ? `neighbourhood=${selectedNeighbourhood}` : '';
    const reviewParam = selectedReview ? `&reviewScore=${selectedReview}` : '';
    const minPriceParam = minPrice ? `&minPrice=${minPrice}` : '';
    const maxPriceParam = maxPrice ? `&maxPrice=${maxPrice}` : '';
    return `${baseURL}${endpoint}?${neighbourhoodParam}${reviewParam}${minPriceParam}${maxPriceParam}`;
};

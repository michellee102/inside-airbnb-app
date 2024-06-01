
// Utility function to generate fetch URL based on parameters
export const generateFetchUrl = (endpoint, params) => {
    const { neighbourhood, review, minPrice, maxPrice } = params;
    const baseURL = 'https://localhost:7049/';
    const neighbourhoodParam = neighbourhood ? `neighbourhood=${neighbourhood}` : '';
    const reviewParam = review ? `&reviewScore=${review}` : '';
    const minPriceParam = minPrice ? `&minPrice=${minPrice}` : '';
    const maxPriceParam = maxPrice ? `&maxPrice=${maxPrice}` : '';
    return `${baseURL}${endpoint}?${neighbourhoodParam}${reviewParam}${minPriceParam}${maxPriceParam}`;
};

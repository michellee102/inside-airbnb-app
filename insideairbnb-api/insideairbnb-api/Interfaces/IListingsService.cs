using insideairbnb_api.Models;
using insideairbnb_api.DTOs;


namespace insideairbnb_api.Interfaces
{
    public interface IListingsService
    {

        public Task<List<GeoLocationInfo>> GetAllGeoLocationInfo();
        public Task<ListingPopupInfo> GetListingDetails(string listingId);
        public Task<List<GeoLocationInfo>> GetListingsFiltered(string? neighbourhood, double? reviewScore, double? maxPrice, double? minPrice);
        //public Task<Dictionary<string, int>> GetStatistics(string? neighbourhood, double? reviewScore, double? minPrice, double? maxPrice);
        public Task<List<NightsPerMonthDTO>> GetAverageNightsPerMonth(string? neighbourhood, double? reviewScore, double? minPrice, double? maxPrice);
        public Task<List<MonthRevenueDTO>> GetTotalRevenuePerMonth(string? neighbourhood, double? reviewScore, double? minPrice, double? maxPrice);
        public Task<AverageRating> GetOverallAverageRating(string? neighbourhood, double? reviewScore, double? minPrice, double? maxPrice);
    }
}

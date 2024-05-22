using insideairbnb_api.Models;
using insideairbnb_api.DTOs;


namespace insideairbnb_api.Interfaces
{
    public interface IListingsService
    {

        public Task<List<GeoLocationInfo>> GetAllGeoLocationInfo();
        public Task<DetailedListingsParij> GetListingDetails(string listingId);
        public Task<List<string>> GetListingsFiltered(string? neighbourhood, double? reviewScore);
        public  Task<List<DetailedListingsParij>> GetListingsGEOLOC();

    }
}

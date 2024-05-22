using insideairbnb_api.DTOs;

namespace insideairbnb_api.Interfaces
{
    public interface IListingRepository
    {
        Task<List<GeoLocationInfo>> GetAllGeoLocationInfo();
        Task<ListingPopupInfo?> GetListingDetails(string listingId);
    }
}

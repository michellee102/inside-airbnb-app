using insideairbnb_api.Models;


namespace insideairbnb_api.Interfaces
{
    public interface IListingsService
    {

        public List<GeoLocationInfo> GetAllGeoLocationInfo();
        public List<FilteredListing> GetListingsByNeighbourhood(string neighbourhood);
        public DetailedListingsParij GetListingDetails(string listingId);
        public List<string> GetListingsFiltered(string neighbourhood = null, double? reviewScore = null);

    }
}

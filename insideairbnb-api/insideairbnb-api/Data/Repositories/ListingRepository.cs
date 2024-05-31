using insideairbnb_api.DTOs;
using insideairbnb_api.Helpers;
using insideairbnb_api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace insideairbnb_api.Data.Repositories
{
    public class ListingRepository : IListingRepository
    {
        private readonly InsideAirBnb2024Context _dataContext;

        public ListingRepository(InsideAirBnb2024Context dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<GeoLocationInfo>> GetAllGeoLocationInfo()
        {
            List<GeoLocationInfo> listings = await _dataContext.DetailedListingsParijs
                .Select(l => new GeoLocationInfo
                {
                    Id = l.Id,
                    Longitude = l.Longitude,
                    Latitude = l.Latitude
                })
                .AsNoTracking()
                .ToListAsync();
            return LongLatHelper.FormatLongLat(listings);
        }

        public async Task<ListingPopupInfo?> GetListingDetails(string listingId)
        {
            var listingInfo = await _dataContext.DetailedListingsParijs
                .Where(listing => listing.Id == listingId)
                .Select(listing => new ListingPopupInfo
                {
                    Id = listing.Id,
                    HostName = listing.HostName,
                    Name = listing.Name,
                    Price = listing.Price,
                    NumberOfReviews = listing.NumberOfReviews,
                    ListingUrl = listing.ListingUrl,
                    HostUrl = listing.HostUrl,
                    NeighbourhoodCleansed = listing.NeighbourhoodCleansed,
                    Latitude = listing.Latitude,
                    Longitude = listing.Longitude
                })
                .FirstOrDefaultAsync();

            if (listingInfo != null)
            {
                return LongLatHelper.FormatLongLatSingle(listingInfo);
            }
            return null;
        }

        public Task<List<string>> GetListingsFiltered(string? neighbourhood, double? reviewScore)
        {
            throw new NotImplementedException();
        }
    }
}

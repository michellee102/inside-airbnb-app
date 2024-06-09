using insideairbnb_api.DTOs;
using insideairbnb_api.Helpers;
using insideairbnb_api.Interfaces;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace insideairbnb_api.Data.Repositories
{
    public class ListingRepository : IListingRepository
    {
        private readonly InsideAirBnb2024Context _dataContext;
        private readonly IDatabase _redisDatabase;

        public ListingRepository(InsideAirBnb2024Context dataContext
            , IConnectionMultiplexer redisConnection
            )
        {
            _dataContext = dataContext;
            _redisDatabase = redisConnection.GetDatabase();
        }

        public async Task<List<GeoLocationInfo>> GetAllGeoLocationInfo()
        {
            //string cacheKey = "AllGeoLocationInfo";

            //string cachedData = await _redisDatabase.StringGetAsync(cacheKey);
            //if (!string.IsNullOrEmpty(cachedData))
            //{
            //    return JsonConvert.DeserializeObject<List<GeoLocationInfo>>(cachedData);
            //}

            List<GeoLocationInfo> listings = await _dataContext.DetailedListingsParijs
                .Select(l => new GeoLocationInfo
                {
                    Id = l.Id,
                    Longitude = l.Longitude,
                    Latitude = l.Latitude
                })
                .AsNoTracking()
                .ToListAsync();

            var formattedListings = LongLatHelper.FormatLongLat(listings);
            //await _redisDatabase.StringSetAsync(cacheKey, JsonConvert.SerializeObject(formattedListings));
            return formattedListings;
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

using insideairbnb_api.Data;
using insideairbnb_api.Helpers;
using insideairbnb_api.Interfaces;
using insideairbnb_api.Models;
using insideairbnb_api.DTOs;
using Microsoft.EntityFrameworkCore;

namespace insideairbnb_api.Services
{
    public class ListingsServiceImpl : IListingsService
    {
        private readonly InsideAirBnb2024Context _dataContext;

        public ListingsServiceImpl(InsideAirBnb2024Context dataContext)
        {
            _dataContext = dataContext;
        }


        public async Task<List<GeoLocationInfo>> GetAllGeoLocationInfo()
        {
            List<GeoLocationInfo> listings = await _dataContext.GeoLocationInfos.ToListAsync();
            return LongLatHelper.FormatLongLat(listings);
        }

        public async Task<List<DetailedListingsParij>> GetListingsGEOLOC()
        {
            List<DetailedListingsParij> listings = await _dataContext.DetailedListingsParijs
        .Select( l => new DetailedListingsParij
        {
            Id = l.Id,
            Longitude = l.Longitude,
            Latitude = l.Latitude
        })
        .ToListAsync();
            return LongLatHelper.FormatLongLat(listings);
        }


        public async Task<DetailedListingsParij?> GetListingDetails(string listingId)
        {
            DetailedListingsParij listingInfo = await _dataContext.DetailedListingsParijs
             .Where(listing => listing.Id == listingId)
              .FirstAsync();
            if (listingInfo != null)
            {
                return LongLatHelper.FormatLongLatSingle(listingInfo);
            }
                return null;
        }

        public async Task<List<string>> GetListingsFiltered(string? neighbourhood, double? reviewScore)
        {
            var listings = _dataContext.DetailedListingsParijs.AsQueryable();

            if (!string.IsNullOrEmpty(neighbourhood))
            {
                listings = listings.Where(listing => listing.NeighbourhoodCleansed == neighbourhood);
            }

            if (reviewScore.HasValue)
            {
                listings = listings.Where(listing =>
                    listing.ReviewScoresRating != null &&
                    listing.ReviewScoresRating.ToString().StartsWith(reviewScore.ToString()));
            }

            var filteredIds = await listings.Select(listing => listing.Id).ToListAsync();
            return filteredIds;
        }
    }
}

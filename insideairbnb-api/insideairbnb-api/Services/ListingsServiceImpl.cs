using insideairbnb_api.Data;
using insideairbnb_api.Helpers;
using insideairbnb_api.Interfaces;
using insideairbnb_api.Models;
using insideairbnb_api.DTOs;
using Microsoft.EntityFrameworkCore;
using insideairbnb_api.Data.Repositories;

namespace insideairbnb_api.Services
{
    public class ListingsServiceImpl : IListingsService
    {
        private readonly InsideAirBnb2024Context _dataContext;
        private readonly IListingRepository _listingRepository;

        public ListingsServiceImpl(InsideAirBnb2024Context dataContext, IListingRepository listingRepository)
        {
            _dataContext = dataContext;
            _listingRepository = listingRepository;
        }


        public async Task<List<GeoLocationInfo>> GetAllGeoLocationInfo()
        {
            return await _listingRepository.GetAllGeoLocationInfo();
        }

     
        public async Task<ListingPopupInfo?> GetListingDetails(string listingId)
        {
            return await _listingRepository.GetListingDetails(listingId);
        }

     
        public async Task<List<string>> GetListingsFiltered(string? neighbourhood, double? reviewScore, string? maxPrice)
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

            if (!string.IsNullOrEmpty(maxPrice))
            {
                listings = listings.Where(listing =>
                    listing.Price_Formatted != null &&
                    string.Compare(listing.Price_Formatted, maxPrice) <= 0);
            }

            var filteredIds = await listings.Select(listing => listing.Id).ToListAsync();
            return filteredIds;
        }
    }
}

using insideairbnb_api.Data;
using insideairbnb_api.Helpers;
using insideairbnb_api.Interfaces;
using insideairbnb_api.Models;
using insideairbnb_api.DTOs;
using Microsoft.EntityFrameworkCore;
using insideairbnb_api.Data.Repositories;
using System.Globalization;
using insideairbnb_api.Controllers;

namespace insideairbnb_api.Services
{
    public class ListingsServiceImpl : IListingsService
    {
        private readonly InsideAirBnb2024Context _dataContext;
        private readonly IListingRepository _listingRepository;
        private readonly ILogger<ListingsServiceImpl> _logger;

        public ListingsServiceImpl(InsideAirBnb2024Context dataContext, IListingRepository listingRepository, ILogger<ListingsServiceImpl> logger)
        {
            _dataContext = dataContext;
            _listingRepository = listingRepository;
            _logger = logger;
        }


        public async Task<List<GeoLocationInfo>> GetAllGeoLocationInfo()
        {
            return await _listingRepository.GetAllGeoLocationInfo();
        }

     
        public async Task<ListingPopupInfo?> GetListingDetails(string listingId)
        {
            return await _listingRepository.GetListingDetails(listingId);
        }

     
        public async Task<List<string>> GetListingsFiltered(string? neighbourhood, double? reviewScore, double? minPrice, double? maxPrice)
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

            if (maxPrice.HasValue && minPrice.HasValue)
            {
                listings = listings.Where(listing =>
                                   listing.Price_Formatted >= minPrice && listing.Price_Formatted <= maxPrice);

            }
            else if (maxPrice.HasValue)
            {
                listings = listings.Where(listing =>
                                   listing.Price_Formatted <= maxPrice);
            }
            else if (minPrice.HasValue)
            {

                listings = listings.Where(listing =>
                                   listing.Price_Formatted >= minPrice);
            }



            var filteredIds = await listings.Select(listing => listing.Id).ToListAsync();
            return filteredIds;
        }
    }
}

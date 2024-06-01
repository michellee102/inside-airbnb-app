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


        public IQueryable<DetailedListingsParij> ApplyFilters(string? neighbourhood, double? reviewScore, double? minPrice, double? maxPrice)
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

            return listings;
        }

        public async Task<List<GeoLocationInfo>> GetListingsFiltered(string? neighbourhood, double? reviewScore, double? minPrice, double? maxPrice)
        {
            var listings = ApplyFilters(neighbourhood, reviewScore, minPrice, maxPrice);
            List<GeoLocationInfo> filteredListings = await listings
     .Where(listing => listing.ReviewScoresRating.HasValue)
     .Select(listing => new GeoLocationInfo
     {
         Id = listing.Id,
         Longitude = listing.Longitude,
         Latitude = listing.Latitude
     })
     .ToListAsync();
            return LongLatHelper.FormatLongLat(filteredListings);
        }

        // Method to get statistics
        //public async Task<Dictionary<string, int>> GetStatistics(string? neighbourhood, double? reviewScore, double? minPrice, double? maxPrice)
        //{
        //    var listings = ApplyFilters(neighbourhood, reviewScore, minPrice, maxPrice);
        //    var stats = await listings
        //        .GroupBy(listing => listing.PropertyType)
        //        .Select(g => new { PropertyType = g.Key, Count = g.Count() })
        //        .OrderByDescending(g => g.Count)
        //        .Take(5)
        //        .ToDictionaryAsync(g => g.PropertyType, g => g.Count);

        //    return stats;
        //}

        public async Task<List<NightsPerMonthDTO>> GetAverageNightsPerMonth(string? neighbourhood, double? reviewScore, double? minPrice, double? maxPrice)
        {
            // Apply filters to the listings
            var filteredListings = ApplyFilters(neighbourhood, reviewScore, minPrice, maxPrice);

            // Join the filtered listings with the calendar data
            var result = await _dataContext.DetailedCalendarParijsConverteds
                .AsNoTracking() // Disable change tracking for read-only operations
                .Join(filteredListings, dc => dc.ListingId, l => l.Id, (dc, l) => dc) // Join on ListingId
                .Where(dc => !dc.Available) // Only count booked nights
                .GroupBy(dc => new { dc.Date.Year, dc.Date.Month })
                .OrderBy(x => x.Key.Year)
                .ThenBy(x => x.Key.Month)
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    AverageNights = (double?)g.Average(dc => dc.MinimumNights)
                })
                .ToListAsync();

            return result.Select(r => new NightsPerMonthDTO
            {
                Month = $"{r.Year}-{r.Month:00}",
                AverageNights = (int)Math.Round(r.AverageNights ?? 0.0) // Round to the nearest whole number and convert to int
            }).ToList();
        }

        public async Task<List<MonthRevenueDTO>> GetTotalRevenuePerMonth(string? neighbourhood, double? reviewScore, double? minPrice, double? maxPrice)
        {
            // Apply filters to the listings
            var filteredListings = ApplyFilters(neighbourhood, reviewScore, minPrice, maxPrice);
            _logger.LogInformation("Filtered Listings: " + filteredListings.Count());

            // Join the filtered listings with the calendar data
            var result = await _dataContext.DetailedCalendarParijsConverteds
                .Join(filteredListings, dc => dc.ListingId, l => l.Id, (dc, l) => new { dc, l })
                .Where(x => !x.dc.Available) // Only count booked nights
                .GroupBy(x => new { x.dc.Date.Year, x.dc.Date.Month })
                .OrderBy(x => x.Key.Year)
                .ThenBy(x => x.Key.Month)
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    TotalRevenue = g.Sum(x => (decimal)x.l.Price_Formatted)
                })
                .ToListAsync();

      
            return result.Select(r => new MonthRevenueDTO
            {
                Month = $"{r.Year}-{r.Month:00}",
                TotalRevenue = r.TotalRevenue
            }).ToList();
        }




        public async Task<AverageRating> GetOverallAverageRating(string? neighbourhood, double? reviewScore, double? minPrice, double? maxPrice)
        {
            // Apply filters to the listings
            var filteredListings = ApplyFilters(neighbourhood, reviewScore, minPrice, maxPrice);

            // Calculate the average rating
            var ratings = await filteredListings
                .Where(listing => listing.ReviewScoresRating.HasValue)
                .Select(listing => listing.ReviewScoresRating.Value / 100)  // Adjust the division based on reviewScore value
                .ToListAsync();

            double result = 0;

            if (ratings.Count > 0)
            {
                result = ratings.Average();
            }

            // Round the average rating to 2 decimal places
            var averageRating = Math.Round(result, 2);

            // Create the DTO
            var dto = new AverageRating();

            if (string.IsNullOrEmpty(neighbourhood))
            {
                // If no neighborhood filter is selected
                dto.Neighbourhood = null;
            }
            else
            {
                // If a neighborhood filter is selected
                dto.Neighbourhood = neighbourhood;
            }

            dto.Rating = averageRating;

            return dto;
        }




    }
}

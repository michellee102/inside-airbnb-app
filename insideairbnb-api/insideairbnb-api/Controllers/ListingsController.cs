using insideairbnb_api.Data;
using insideairbnb_api.Interfaces;
using insideairbnb_api.Models;
using insideairbnb_api.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using StackExchange.Profiling;

namespace insideairbnb_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    //[Authorize]
    public class ListingsController : ControllerBase
    {
        private readonly IListingsService _listingsService;
        private readonly ILogger<ListingsController> _logger;

        public ListingsController(IListingsService listingsService, ILogger<ListingsController> logger)
        {
            _listingsService = listingsService;
            _logger = logger;
        }

        [HttpGet("geoinfo")]
 
        public async Task<IActionResult> GetAllListings()
        {
            List<GeoLocationInfo> listings;
            //using (MiniProfiler.Current.Step("GetAllListings"))
            //{
                listings = await _listingsService.GetAllGeoLocationInfo();
            //}

            return Ok(listings);
         
        }


        [HttpGet("filter")]
        public async Task<IActionResult> GetListingsFiltered(string? neighbourhood, double? reviewScore, double? maxPrice, double? minPrice)
        {
            List<GeoLocationInfo> listings = await _listingsService.GetListingsFiltered(neighbourhood, reviewScore, minPrice, maxPrice);
            return Ok(listings);
        }

        //[HttpGet("stats/top5")]
        //public async Task<IActionResult> GetTop5Properties(string? neighbourhood, double? reviewScore, double? maxPrice, double? minPrice)
        //{
        //    Dictionary<string, int> propertystats = await _listingsService.GetStatistics(neighbourhood, reviewScore, minPrice, maxPrice);
        //    return Ok(propertystats);
        //}

        [HttpGet("stats/average-nights-per-month")]
        //[Authorize("read:stats")]
        public async Task<IActionResult> GetAverageNightsPerMonth(string? neighbourhood, double? reviewScore, double? maxPrice, double? minPrice)
        {
            var stats = await _listingsService.GetAverageNightsPerMonth(neighbourhood, reviewScore, minPrice, maxPrice);
            return Ok(stats);
        }

        [HttpGet("stats/revenue-per-month")]
        //[Authorize("read:stats")]
        public async Task<IActionResult> GetTotalRevenuePerNeighbourhoodPerMonth(string? neighbourhood, double? reviewScore, double? maxPrice, double? minPrice)
        {
            var stats = await _listingsService.GetTotalRevenuePerMonth(neighbourhood, reviewScore, minPrice, maxPrice);
            return Ok(stats);
        }

        [HttpGet("stats/average-rating")]
        //[Authorize("read:stats")]
        public async Task<IActionResult> GetAverageRatingPerNeighbourhood(string? neighbourhood, double? reviewScore, double? maxPrice, double? minPrice)
        {
            var stats = await _listingsService.GetOverallAverageRating(neighbourhood, reviewScore, minPrice, maxPrice);
            return Ok(stats);
        }

        [HttpGet("{id}/details")]
        public async Task<IActionResult> GetListingDetails(string id)
        {
            ListingPopupInfo listingInfo = await _listingsService.GetListingDetails(id);
            if (listingInfo == null)
            {
                return NotFound();
            }

            return Ok(listingInfo);
        }

        //[HttpGet("authentication")]
        //[Authorize]
        //public ActionResult<string> GetAuthentication()
        //{
        //    const string authenticated = "You have been authenticated!";
        //    return Ok(authenticated);
        //}

        //[HttpGet("authorize")]
        //[Authorize("read:stats")]
        //public ActionResult<string> TestAuthorize()
        //{
        //    const string authorized = "You have been authorized admin!!";
        //    return Ok(authorized);
        //}


    }
}

using insideairbnb_api.Data;
using insideairbnb_api.Interfaces;
using insideairbnb_api.Models;
using insideairbnb_api.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace insideairbnb_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListingsController : ControllerBase
    {
        private readonly IListingsService _listingsService;

        public ListingsController(IListingsService listingsService)
        {
            _listingsService = listingsService;
        }

        [HttpGet("geoinfo")]
        public async Task<IActionResult> GetAllListings()
        {
            List<GeoLocationInfo> listings = await _listingsService.GetAllGeoLocationInfo();
            return Ok(listings);
        }

        [HttpGet("test")]
        public async Task<IActionResult> GetAllListingsTest()
        {
            List<DetailedListingsParij> listings = await _listingsService.GetListingsGEOLOC();
            return Ok(listings);
        }


        [HttpGet("filter")]
        public async Task<IActionResult> GetListingsFiltered(string? neighbourhood, double? reviewScore)
        {
            List<string> listings = await _listingsService.GetListingsFiltered(neighbourhood, reviewScore);
            return Ok(listings);
        }

        [HttpGet("{id}/details")]
        public async Task<IActionResult> GetListingDetails(string id)
        {
            DetailedListingsParij listingInfo =await _listingsService.GetListingDetails(id);
            if(listingInfo == null)
            {
                return NotFound();
            }
         
                return Ok(listingInfo);
        }



    }
}

using insideairbnb_api.Data;
using insideairbnb_api.Interfaces;
using insideairbnb_api.Models;
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
        public ActionResult<List<GeoLocationInfo>> GetAllListings()
        {
            List<GeoLocationInfo> listings = _listingsService.GetAllGeoLocationInfo();
            return Ok(listings);
        }

        [HttpGet("{neighbourhood}")]
        public ActionResult<List<FilteredListing>> GetListingsByNeighbourhood(string neighbourhood)
        {

            List<FilteredListing> listings = _listingsService.GetListingsByNeighbourhood(neighbourhood);
            return Ok(listings);
        }

        [HttpGet("filter")]
        public ActionResult<List<string>> GetListingsFiltered(string? neighbourhood, double? reviewScore)
        {

            List<string> listings = _listingsService.GetListingsFiltered(neighbourhood, reviewScore);
            return Ok(listings);
        }

        [HttpGet("{id}/details")]
        public ActionResult<DetailedListingsParij> GetListingDetails(string id)
        {
            DetailedListingsParij listingInfo = _listingsService.GetListingDetails(id);
            if(listingInfo != null)
            {
                return Ok(listingInfo);
            }
            return NotFound();
        }



    }
}

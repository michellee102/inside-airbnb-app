
using insideairbnb_api.Data;
using insideairbnb_api.DTOs;
using insideairbnb_api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace insideairbnb_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    //[Authorize]
    public class StatsController : ControllerBase
    {

        private readonly InsideAirBnb2024Context _context;
        private readonly ISortStrategyFactory _sortStrategyFactory;


        public StatsController(InsideAirBnb2024Context context, ISortStrategyFactory sortStrategyFactory)
        {
            _context = context;
            _sortStrategyFactory = sortStrategyFactory;
        }


        [HttpGet]
        public async Task<IActionResult> GetListingStats(string sortType)
        {
            if (string.IsNullOrWhiteSpace(sortType))
            {
                return BadRequest("Sort type is required.");
            }

            ISortStrategy sortStrategy = _sortStrategyFactory.GetSortStrategy(sortType);

            if (sortStrategy == null)
            {
                return BadRequest("Invalid sort type.");
            }

            List<ListingPopupInfo> sortedListings = await sortStrategy.ApplySort();

            return Ok(sortedListings);
        }


        [HttpGet("property_type")]
        public async Task<ActionResult<List<PropertyTypesDTO>>> GetNeighbourhoodRoomType()
        {
            var result = await _context.DetailedListingsParijs
                .Select(listing => new PropertyTypesDTO
                {
                    Neighbourhood = listing.NeighbourhoodCleansed,
                    PropertyType = listing.PropertyType
                }).ToListAsync();


            return Ok(result);
        }

    }
}

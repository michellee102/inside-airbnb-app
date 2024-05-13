using insideairbnb_api.Data;
using insideairbnb_api.Factories;
using insideairbnb_api.Interfaces;
using insideairbnb_api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace insideairbnb_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
        public IActionResult GetPriceStats(string sortType)
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

            var sortedListings = sortStrategy.ApplySort();

            // Hier kun je verdere logica toevoegen om de resultaten te verwerken
            // en een respons terug te sturen.

            return Ok(sortedListings);
        }



        //[HttpGet]
        //public ActionResult<List<RoomTypeCountDTO>> GetAllListings()
        //{
        //    List<RoomTypeCountDTO> listings = _context.DetailedListingsParijs
        //        .GroupBy(listing => listing.RoomType)
        //        .Select(group => new RoomTypeCountDTO
        //        {
        //            RoomType = group.Key,
        //            Count = group.Count()
        //        })
        //        .ToList();

        //    return Ok(listings);
        //}



    }
}

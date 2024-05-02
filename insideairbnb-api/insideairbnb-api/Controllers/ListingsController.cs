using insideairbnb_api.Data;
using insideairbnb_api.Entities;
using Microsoft.AspNetCore.Mvc;

namespace insideairbnb_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListingsController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public ListingsController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public ActionResult<List<Listing>> GetAllListings()
        {
            List<Listing> listings = _dataContext.Detailed_Listings_Parijs.Take(100).ToList();
            return Ok(listings);
        }

    }
}

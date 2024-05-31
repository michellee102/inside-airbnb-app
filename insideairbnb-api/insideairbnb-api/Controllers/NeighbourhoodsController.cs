using insideairbnb_api.Data;
using insideairbnb_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace insideairbnb_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class NeighbourhoodsController : ControllerBase
    {
        private readonly InsideAirBnb2024Context _dataContext;

        public NeighbourhoodsController(InsideAirBnb2024Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public ActionResult<List<Neighbourhood>> GetAllNeighbourhoods()
        {
            List<Neighbourhood> neighbourhoods = _dataContext.Neighbourhoods.ToList();

            return Ok(neighbourhoods);
        }
    }
}

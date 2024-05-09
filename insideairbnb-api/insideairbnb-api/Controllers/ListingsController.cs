using insideairbnb_api.Data;
using insideairbnb_api.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

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
            List<Listing> listings = _dataContext.Detailed_Listings_Parijs.ToList();

            // Loop door elke Listing en pas de latitude aan
            foreach (var listing in listings)
            {
                // Converteer de latitude naar een string
                string latitudeString = listing.Latitude.ToString();
                // Controleer of de lengte van de string groter is dan 2
                if (latitudeString.Length > 2)
                {
                    // Voeg een decimaalpunt in na de eerste 2 cijfers
                    string formattedLatitude = latitudeString.Insert(2, ".");
                    // Converteer de geformatteerde string terug naar een double
                    listing.Latitude = double.Parse(formattedLatitude, CultureInfo.InvariantCulture);
                }

                // Converteer de longitude naar een string
                string longitudeString = listing.Longitude.ToString();
                // Controleer of de lengte van de string groter is dan 1
                if (longitudeString.Length > 1)
                {
                    // Voeg een decimaalpunt in na het eerste cijfer
                    string formattedLongitude = longitudeString.Insert(1, ".");
                    // Converteer de geformatteerde string terug naar een double
                    listing.Longitude = double.Parse(formattedLongitude, CultureInfo.InvariantCulture);
                }
            }

            return Ok(listings);
        }



    }
}

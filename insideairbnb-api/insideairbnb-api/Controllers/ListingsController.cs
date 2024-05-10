using insideairbnb_api.Data;
using insideairbnb_api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace insideairbnb_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListingsController : ControllerBase
    {
        private readonly InsideAirBnb2024Context _dataContext;

        public ListingsController(InsideAirBnb2024Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet("geoinfo")]
        public ActionResult<List<GeoLocationInfo>> GetAllListings()
        {
            List<GeoLocationInfo> listings = _dataContext.GeoLocationInfos.ToList();

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



        [HttpGet]
        public ActionResult<List<Listing>> GetAll()
        {
            List<Listing> listings = _dataContext.Listings.ToList();

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

        [HttpGet("{neighbourhood}")]
        public ActionResult<List<FilteredListing>> GetListingsByNeighbourhood(string neighbourhood)
        {

            // Vervang de FilteredListing class met het echte type van de listings
            List<Listing> listings = _dataContext.Listings
                .Where(listing => listing.Neighbourhood == neighbourhood)
                .Select(listing => new Listing
                {
                    Id = listing.Id,
                    Latitude = listing.Latitude,
                    Longitude = listing.Longitude,
                    Neighbourhood = listing.Neighbourhood
                })
                .ToList();



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

        [HttpGet("{id}/details")]
        public ActionResult<DetailedListingsParij> GetListingDetails(string id)
        {
            DetailedListingsParij listingInfo = _dataContext.DetailedListingsParijs
                .Where(listing => listing.Id == id)
                 .FirstOrDefault();
            if (listingInfo != null)
            {
                // Loop door elke Listing en pas de latitude aan
              
                    // Converteer de latitude naar een string
                    string latitudeString = listingInfo.Latitude.ToString();
                    // Controleer of de lengte van de string groter is dan 2
                    if (latitudeString.Length > 2)
                    {
                        // Voeg een decimaalpunt in na de eerste 2 cijfers
                        string formattedLatitude = latitudeString.Insert(2, ".");
                    // Converteer de geformatteerde string terug naar een double
                    listingInfo.Latitude = double.Parse(formattedLatitude, CultureInfo.InvariantCulture);
                    }

                    // Converteer de longitude naar een string
                    string longitudeString = listingInfo.Longitude.ToString();
                    // Controleer of de lengte van de string groter is dan 1
                    if (longitudeString.Length > 1)
                    {
                        // Voeg een decimaalpunt in na het eerste cijfer
                        string formattedLongitude = longitudeString.Insert(1, ".");
                    // Converteer de geformatteerde string terug naar een double
                    listingInfo.Longitude = double.Parse(formattedLongitude, CultureInfo.InvariantCulture);
      
                }
                return Ok(listingInfo);
            }
            else
            {
                return NotFound(); // Returneer een 404 Not Found als er geen overeenkomende objecten zijn
            }
        }
    }
}

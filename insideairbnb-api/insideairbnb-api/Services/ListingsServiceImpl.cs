using insideairbnb_api.Data;
using insideairbnb_api.Interfaces;
using insideairbnb_api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace insideairbnb_api.Services
{
    public class ListingsServiceImpl : IListingsService
    {
        private readonly InsideAirBnb2024Context _dataContext;


        public ListingsServiceImpl(InsideAirBnb2024Context dataContext)
        {
            _dataContext = dataContext;
        }

        private List<T> FormatLongLat<T>(List<T> listings)
        {
            foreach (var listing in listings)
            {
                var latitudeProperty = typeof(T).GetProperty("Latitude");
                var longitudeProperty = typeof(T).GetProperty("Longitude");


                // Converteer de latitude naar een string
                string latitudeString = latitudeProperty.GetValue(listing)?.ToString(); // Let op de null-check om een mogelijke NullReferenceException te voorkomen
                                                                                        // Controleer of de lengte van de string groter is dan 2
                if (latitudeString.Length > 2)
                {
                    // Voeg een decimaalpunt in na de eerste 2 cijfers
                    string formattedLatitude = latitudeString.Insert(2, ".");
                    // Converteer de geformatteerde string terug naar een double
                    double latitudeValue = double.Parse(formattedLatitude, CultureInfo.InvariantCulture);
                    // Wijzig de waarde van de latitude eigenschap van het listing object
                    latitudeProperty.SetValue(listing, latitudeValue);
                }

                // Converteer de longitude naar een string
                string longitudeString = longitudeProperty.GetValue(listing)?.ToString(); // Let op de null-check om een mogelijke NullReferenceException te voorkomen
                                                                                          // Controleer of de lengte van de string groter is dan 1
                if (longitudeString.Length > 1)
                {
                    // Voeg een decimaalpunt in na het eerste cijfer
                    string formattedLongitude = longitudeString.Insert(1, ".");
                    // Converteer de geformatteerde string terug naar een double
                    double longitudeValue = double.Parse(formattedLongitude, CultureInfo.InvariantCulture);
                    // Wijzig de waarde van de longitude eigenschap van het listing object
                    longitudeProperty.SetValue(listing, longitudeValue);
                }

            }
            return listings;
        }


        public List<GeoLocationInfo> GetAllGeoLocationInfo()
        {
            //List<GeoLocationInfo> listings = _locationsRepository.GetAll
            List<GeoLocationInfo> listings = _dataContext.GeoLocationInfos.ToList();
            return FormatLongLat(listings);
        }

        public List<FilteredListing> GetListingsByNeighbourhood(string neighbourhood)
        {
            // Vervang de FilteredListing class met het echte type van de listings
            List<FilteredListing> listings = _dataContext.DetailedListingsParijs
                .Where(listing => listing.NeighbourhoodCleansed == neighbourhood)
                .Select(listing => new FilteredListing
                {
                    Id = listing.Id,
                    Latitude = listing.Latitude,
                    Longitude = listing.Longitude,
                    Neighbourhood = listing.NeighbourhoodCleansed
                })
                .ToList();
            return FormatLongLat(listings) ;
     






            //Func<DetailedListingsParij, bool> predicate = listing => listing.NeighbourhoodCleansed == neighbourhood;

            //// Definieer de mapperfunctie om elke entiteit te mappen naar een FilteredListing
            //Func<DetailedListingsParij, FilteredListing> mapper = listing => new FilteredListing
            //{
            //    Id = listing.Id,
            //    Latitude = listing.Latitude,
            //    Longitude = listing.Longitude,
            //    Neighbourhood = listing.NeighbourhoodCleansed
            //};

            //return FormatLongLat(_detailedListingsRepository.GetByNeighbourhood(predicate, mapper));
        }

        public DetailedListingsParij GetListingDetails(string listingId)
        {
            DetailedListingsParij listingInfo = _dataContext.DetailedListingsParijs
             .Where(listing => listing.Id == listingId)
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
                return listingInfo;
            }

            else
            {
                return null; // Returneer een 404 Not Found als er geen overeenkomende objecten zijn
            }
        }

        public List<string> GetListingsFiltered(string? neighbourhood, double? reviewScore)
        {
            var listings = _dataContext.DetailedListingsParijs.AsQueryable();

            if (!string.IsNullOrEmpty(neighbourhood))
            {
                listings = listings.Where(listing => listing.NeighbourhoodCleansed == neighbourhood);
            }

            // Voeg filterlogica toe voor minimaal beoordelingsscore
            if (reviewScore.HasValue)
            {
                listings = listings.Where(listing =>
                    listing.ReviewScoresRating != null &&
                    listing.ReviewScoresRating.ToString().StartsWith(reviewScore.ToString()));
            }


            // Voeg hier andere filterlogica toe op basis van de andere parameters

            var filteredIds = listings.Select(listing => listing.Id).ToList();

            return filteredIds;
        }
    }
}

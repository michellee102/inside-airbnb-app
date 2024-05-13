using insideairbnb_api.Data;
using insideairbnb_api.Helpers;
using insideairbnb_api.Interfaces;
using insideairbnb_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace insideairbnb_api.Services.Strategies
{
    public class SortListingsPriceHighToLow : ISortStrategy
    {
        private readonly InsideAirBnb2024Context _context;

        public SortListingsPriceHighToLow(InsideAirBnb2024Context context)
        {
            _context = context;
        }

        public List<ListingPopupInfo> ApplySort()
        {
            var listings = _context.DetailedListingsParijs
                .Where(l => l.Price != null) // Filter null prijzen
                .Select(l => new ListingPopupInfo
                {
                    Id = l.Id,
                    HostName = l.HostName,
                    Price = l.Price,
                    NumberOfReviews = l.NumberOfReviews,
                    ListingUrl = l.ListingUrl,
                    HostUrl = l.HostUrl,
                    NeighbourhoodCleansed = l.NeighbourhoodCleansed,
                    Name = l.Name
                }).ToList();

            // Sorteer de lijsten op basis van de prijs, van hoog naar laag
            var sortedListings = listings.OrderByDescending(l => PriceHelper.GetPriceValue(l.Price)).ToList();

            // Zet komma's terug in de prijzen
            //sortedListings.ForEach(l => l.Price = PriceHelper.FormatPrice(l.Price));

            return sortedListings;
        }

       
    }
}

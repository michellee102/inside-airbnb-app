using insideairbnb_api.Data;
using insideairbnb_api.Helpers;
using insideairbnb_api.Interfaces;
using insideairbnb_api.Models;

namespace insideairbnb_api.Services.Strategies
{
    public class SortListingsPriceLowToHigh : ISortStrategy
    {
        private readonly InsideAirBnb2024Context _context;

        public SortListingsPriceLowToHigh(InsideAirBnb2024Context context)
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

            // Sorteer de lijsten op basis van de prijs
            var sortedListings = listings.OrderBy(l => PriceHelper.GetPriceValue(l.Price)).ToList();

            //// Zet komma's terug in de prijzen
            //sortedListings.ForEach(l => l.Price = PriceHelper.FormatPrice(l.Price));

            return sortedListings;
        }

  
    }
}

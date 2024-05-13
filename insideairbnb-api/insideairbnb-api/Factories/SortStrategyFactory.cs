using insideairbnb_api.Data;
using insideairbnb_api.Interfaces;
using insideairbnb_api.Services.Strategies;
using Microsoft.EntityFrameworkCore;

namespace insideairbnb_api.Factories
{
    public class SortStrategyFactory : ISortStrategyFactory
    {
        private readonly InsideAirBnb2024Context _context;
        public SortStrategyFactory(InsideAirBnb2024Context context)
        {
            _context = context;
        }
        public ISortStrategy GetSortStrategy(string sortType)
        {
            switch (sortType.ToLower())
            {
                case "lowtohigh":
                    return new SortListingsPriceLowToHigh(_context);
                case "hightolow":
                    return new SortListingsPriceHighToLow(_context);
                default:
                    return null;
            }
        }

    }
}

﻿using insideairbnb_api.Data;
using insideairbnb_api.DTOs;
using insideairbnb_api.Helpers;
using insideairbnb_api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace insideairbnb_api.Services.Strategies
{
    public class SortListingsPriceLowToHigh : ISortStrategy
    {
        private readonly InsideAirBnb2024Context _context;

        public SortListingsPriceLowToHigh(InsideAirBnb2024Context context)
        {
            _context = context;
        }

        public async Task<List<ListingPopupInfo>> ApplySort()
        {
            List<ListingPopupInfo> listings = await _context.DetailedListingsParijs
                 .Where(l => l.Price != null) 
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
            }).ToListAsync();

            List<ListingPopupInfo> sortedListings = listings.OrderBy(l => PriceHelper.GetPriceValue(l.Price)).ToList();
            return sortedListings;
        }
    }


}

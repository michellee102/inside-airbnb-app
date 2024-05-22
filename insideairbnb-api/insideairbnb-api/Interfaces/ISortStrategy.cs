using insideairbnb_api.DTOs;

namespace insideairbnb_api.Interfaces
{
    public interface ISortStrategy
    {
        Task<List<ListingPopupInfo>> ApplySort();
        
    }
}

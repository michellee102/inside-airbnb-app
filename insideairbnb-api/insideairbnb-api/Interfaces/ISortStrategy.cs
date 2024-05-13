using insideairbnb_api.Models;

namespace insideairbnb_api.Interfaces
{
    public interface ISortStrategy
    {
        List<ListingPopupInfo> ApplySort();
        decimal? GetPriceValue(string price)
        {
            if (string.IsNullOrWhiteSpace(price))
            {
                return null;
            }

            return decimal.Parse(price.Replace("$", "").Replace(",", ""));
        }
    }
}

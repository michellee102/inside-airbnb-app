namespace insideairbnb_api.Helpers
{
    public static class PriceHelper
    {
        public static decimal? GetPriceValue(string price)
        {
            if (string.IsNullOrWhiteSpace(price))
            {
                return null;
            }

            string[] parts = price.Replace("$", "").Split('.');
            string cleanPrice = parts[0].Replace(",", "");

            return decimal.Parse(cleanPrice);
        }

        public static string FormatPrice(string price)
        {
            if (string.IsNullOrWhiteSpace(price))
            {
                return price;
            }

            return decimal.Parse(price).ToString("N0");
        }
    }

}

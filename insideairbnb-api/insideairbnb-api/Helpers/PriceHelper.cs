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

            // Splits de prijs op basis van het decimaalteken (punt)
            string[] parts = price.Replace("$", "").Split('.');

            // Neem alleen het eerste deel (voor de decimale punt) en verwijder komma's
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

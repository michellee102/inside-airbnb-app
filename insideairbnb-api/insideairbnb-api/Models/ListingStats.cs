namespace insideairbnb_api.Models
{
    public class ListingStats
    {
        public string Id { get; set; }

        public double? Latitude { get; set; }

        public double? Longitude { get; set; }
        public string Neighbourhood { get; set; } = null!;
        public string? Price { get; set; }
    }
}

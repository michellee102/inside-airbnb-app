namespace insideairbnb_api.DTOs
{
    public class ListingPopupInfo
    {

        public string Id { get; set; }
        public string? HostName { get; set; }
        public string Name { get; set; } = null!;

        public string? Price { get; set; }
        public int NumberOfReviews { get; set; }
        public string ListingUrl { get; set; } = null!;
        public string? HostUrl { get; set; }
        public string NeighbourhoodCleansed { get; set; } = null!;
        public double Latitude { get; set; }

        public double Longitude { get; set; }
    }
}

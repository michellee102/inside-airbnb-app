namespace insideairbnb_api.Models
{
    public class ListingPopupInfo
    {

        public string Id { get; set; }
        public string? HostName { get; set; }

        public string? Price { get; set; }
        public int NumberOfReviews { get; set; }
        public string ListingUrl { get; set; } = null!;
        public string? HostUrl { get; set; }
        public string NeighbourhoodCleansed { get; set; } = null!;
    }
}

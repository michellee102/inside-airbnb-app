namespace insideairbnb_api.Models
{
    public class FilteredListing
    {

        public string Id { get; set; }

        public double? Latitude { get; set; }

        public double? Longitude { get; set; }
        public string Neighbourhood { get; set; } = null!;
    }
}

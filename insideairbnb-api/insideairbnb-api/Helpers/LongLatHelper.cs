using insideairbnb_api.Models;
using System.Globalization;

namespace insideairbnb_api.Helpers
{
    public static class LongLatHelper
    {
        public static List<T> FormatLongLat<T>(List<T> listings)
        {
            foreach (var listing in listings)
            {
                var latitudeProperty = typeof(T).GetProperty("Latitude");
                var longitudeProperty = typeof(T).GetProperty("Longitude");

                string latitudeString = latitudeProperty.GetValue(listing)?.ToString(); 
                                                                                      
                if (latitudeString.Length > 2)
                {
                    string formattedLatitude = latitudeString.Insert(2, ".");
                    double latitudeValue = double.Parse(formattedLatitude, CultureInfo.InvariantCulture);
                    latitudeProperty.SetValue(listing, latitudeValue);
                }

                string longitudeString = longitudeProperty.GetValue(listing)?.ToString(); 
                                                                                         
                if (longitudeString.Length > 1)
                {
                    string formattedLongitude = longitudeString.Insert(1, ".");
                    double longitudeValue = double.Parse(formattedLongitude, CultureInfo.InvariantCulture);
                    longitudeProperty.SetValue(listing, longitudeValue);
                }

            }
            return listings;
        }

        public static T FormatLongLatSingle<T>(T listingInfo)
        {
            var latitudeProperty = typeof(T).GetProperty("Latitude");
            var longitudeProperty = typeof(T).GetProperty("Longitude");

            string latitudeString = latitudeProperty.GetValue(listingInfo)?.ToString(); 
                                                                      
            {
                string formattedLatitude = latitudeString.Insert(2, ".");
                double latitudeValue = double.Parse(formattedLatitude, CultureInfo.InvariantCulture);
                latitudeProperty.SetValue(listingInfo, latitudeValue);
            }

            string longitudeString = longitudeProperty.GetValue(listingInfo)?.ToString(); // Let op de null-check om een mogelijke NullReferenceException te voorkomen
                                                                                      // Controleer of de lengte van de string groter is dan 1
            if (longitudeString.Length > 1)
            {
                string formattedLongitude = longitudeString.Insert(1, ".");
                double longitudeValue = double.Parse(formattedLongitude, CultureInfo.InvariantCulture);
                longitudeProperty.SetValue(listingInfo, longitudeValue);
            }
            return listingInfo;
        }


    }
}

using System;
using System.Collections.Generic;

namespace insideairbnb_api.DTOs;

public partial class GeoLocationInfo
{
    public string Id { get; set; }

    public double? Latitude { get; set; }

    public double? Longitude { get; set; }
}

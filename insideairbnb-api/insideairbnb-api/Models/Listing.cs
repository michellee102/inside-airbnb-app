using System;
using System.Collections.Generic;

namespace insideairbnb_api.Models;

public partial class Listing
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public int HostId { get; set; }

    public string? HostName { get; set; }

    public string? NeighbourhoodGroup { get; set; }

    public string Neighbourhood { get; set; } = null!;

    public double Latitude { get; set; }

    public double Longitude { get; set; }

    public string RoomType { get; set; } = null!;

    public decimal? Price { get; set; }

    public int MinimumNights { get; set; }

    public int NumberOfReviews { get; set; }

    public DateOnly? LastReview { get; set; }

    public double? ReviewsPerMonth { get; set; }

    public int CalculatedHostListingsCount { get; set; }

    public int Availability365 { get; set; }

    public int NumberOfReviewsLtm { get; set; }

    public string? License { get; set; }
}

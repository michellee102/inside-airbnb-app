using System;
using System.Collections.Generic;

namespace insideairbnb_api.Models;

public partial class DetailedListingsParij
{
    public string Id { get; set; }

    public string ListingUrl { get; set; } = null!;

    public DateTime ScrapeId { get; set; }

    public DateOnly LastScraped { get; set; }

    public string Source { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string? NeighborhoodOverview { get; set; }

    public string PictureUrl { get; set; } = null!;

    public int? HostId { get; set; }

    public string? HostUrl { get; set; }

    public string? HostName { get; set; }

    public DateOnly? HostSince { get; set; }

    public string? HostLocation { get; set; }

    public string? HostAbout { get; set; }

    public string? HostResponseTime { get; set; }

    public string? HostResponseRate { get; set; }

    public string? HostAcceptanceRate { get; set; }

    public bool? HostIsSuperhost { get; set; }

    public string? HostThumbnailUrl { get; set; }

    public string? HostPictureUrl { get; set; }

    public string? HostNeighbourhood { get; set; }

    public int? HostListingsCount { get; set; }

    public int? HostTotalListingsCount { get; set; }

    public string? HostVerifications { get; set; }

    public bool? HostHasProfilePic { get; set; }

    public bool? HostIdentityVerified { get; set; }

    public string? Neighbourhood { get; set; }

    public string NeighbourhoodCleansed { get; set; } = null!;

    public string? NeighbourhoodGroupCleansed { get; set; }

    public double Latitude { get; set; }

    public double Longitude { get; set; }

    public string PropertyType { get; set; } = null!;

    public string RoomType { get; set; } = null!;

    public byte Accommodates { get; set; }

    public string? Bathrooms { get; set; }

    public string? BathroomsText { get; set; }

    public string? Bedrooms { get; set; }

    public byte? Beds { get; set; }

    public string Amenities { get; set; } = null!;

    public string? Price { get; set; }

    public int? MinimumNights { get; set; }

    public int? MaximumNights { get; set; }

    public int? MinimumMinimumNights { get; set; }

    public int? MaximumMinimumNights { get; set; }

    public int? MinimumMaximumNights { get; set; }

    public int? MaximumMaximumNights { get; set; }

    public double? MinimumNightsAvgNtm { get; set; }

    public double? MaximumNightsAvgNtm { get; set; }

    public string? CalendarUpdated { get; set; }

    public bool? HasAvailability { get; set; }

    public int Availability30 { get; set; }

    public int Availability60 { get; set; }

    public int Availability90 { get; set; }

    public int Availability365 { get; set; }

    public DateOnly CalendarLastScraped { get; set; }

    public int NumberOfReviews { get; set; }

    public int NumberOfReviewsLtm { get; set; }

    public int NumberOfReviewsL30d { get; set; }

    public DateOnly? FirstReview { get; set; }

    public DateOnly? LastReview { get; set; }

    public double? ReviewScoresRating { get; set; }

    public double? ReviewScoresAccuracy { get; set; }

    public double? ReviewScoresCleanliness { get; set; }

    public double? ReviewScoresCheckin { get; set; }

    public double? ReviewScoresCommunication { get; set; }

    public double? ReviewScoresLocation { get; set; }

    public double? ReviewScoresValue { get; set; }

    public string? License { get; set; }

    public bool InstantBookable { get; set; }

    public int CalculatedHostListingsCount { get; set; }

    public int CalculatedHostListingsCountEntireHomes { get; set; }

    public int CalculatedHostListingsCountPrivateRooms { get; set; }

    public int CalculatedHostListingsCountSharedRooms { get; set; }

    public float? ReviewsPerMonth { get; set; }
}

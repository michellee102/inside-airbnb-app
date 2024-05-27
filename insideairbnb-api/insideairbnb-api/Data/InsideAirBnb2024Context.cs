using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using insideairbnb_api.Models;
using insideairbnb_api.DTOs;

namespace insideairbnb_api.Data;

public partial class InsideAirBnb2024Context : DbContext
{
    public InsideAirBnb2024Context()
    {
    }

    public InsideAirBnb2024Context(DbContextOptions<InsideAirBnb2024Context> options)
        : base(options)
    {
    }

    public virtual DbSet<DetailedCalendarParijsConverted> DetailedCalendarParijsConverteds { get; set; }

    public virtual DbSet<DetailedCalendarParijsRaw> DetailedCalendarParijsRaws { get; set; }

    public virtual DbSet<DetailedListingsParij> DetailedListingsParijs { get; set; }

    public virtual DbSet<DetailedReviewsParij> DetailedReviewsParijs { get; set; }

    public virtual DbSet<GeoLocationInfo> GeoLocationInfos { get; set; }

    public virtual DbSet<Listing> Listings { get; set; }

    public virtual DbSet<Neighbourhood> Neighbourhoods { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=InsideAirBNB2024;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("SQL_Latin1_General_CP1_CI_AS");

        modelBuilder.Entity<DetailedCalendarParijsConverted>(entity =>
        {
            entity.HasKey(e => new { e.Date, e.ListingId });

            entity.ToTable("Detailed_Calendar_Parijs_Converted");

            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.ListingId).HasColumnName("listing_id");
            entity.Property(e => e.AdjustedPrice)
                .HasMaxLength(50)
                .HasColumnName("adjusted_price");
            entity.Property(e => e.Available).HasColumnName("available");
            entity.Property(e => e.MaximumNights).HasColumnName("maximum_nights");
            entity.Property(e => e.MinimumNights).HasColumnName("minimum_nights");
            entity.Property(e => e.Price).HasColumnName("price");
        });

        modelBuilder.Entity<DetailedCalendarParijsRaw>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Detailed_Calendar_Parijs_Raw");

            entity.Property(e => e.Column4)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Column 4");
            entity.Property(e => e.F)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("f");
            entity.Property(e => e._15000)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("$150 00");
            entity.Property(e => e._2)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("2");
            entity.Property(e => e._20231212)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("2023-12-12");
            entity.Property(e => e._30)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("30");
            entity.Property(e => e._3109)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("3109");
        });

        modelBuilder.Entity<DetailedListingsParij>(entity =>
        {
            entity.ToTable("Detailed_Listings_Parijs");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Accommodates).HasColumnName("accommodates");
            entity.Property(e => e.Amenities)
                .IsUnicode(false)
                .HasColumnName("amenities");
            entity.Property(e => e.Availability30).HasColumnName("availability_30");
            entity.Property(e => e.Availability365).HasColumnName("availability_365");
            entity.Property(e => e.Availability60).HasColumnName("availability_60");
            entity.Property(e => e.Availability90).HasColumnName("availability_90");
            entity.Property(e => e.Bathrooms)
                .HasMaxLength(1)
                .HasColumnName("bathrooms");
            entity.Property(e => e.BathroomsText)
                .IsUnicode(false)
                .HasColumnName("bathrooms_text");
            entity.Property(e => e.Bedrooms)
                .HasMaxLength(1)
                .HasColumnName("bedrooms");
            entity.Property(e => e.Beds).HasColumnName("beds");
            entity.Property(e => e.CalculatedHostListingsCount).HasColumnName("calculated_host_listings_count");
            entity.Property(e => e.CalculatedHostListingsCountEntireHomes).HasColumnName("calculated_host_listings_count_entire_homes");
            entity.Property(e => e.CalculatedHostListingsCountPrivateRooms).HasColumnName("calculated_host_listings_count_private_rooms");
            entity.Property(e => e.CalculatedHostListingsCountSharedRooms).HasColumnName("calculated_host_listings_count_shared_rooms");
            entity.Property(e => e.CalendarLastScraped).HasColumnName("calendar_last_scraped");
            entity.Property(e => e.CalendarUpdated)
                .HasMaxLength(1)
                .HasColumnName("calendar_updated");
            entity.Property(e => e.Description)
                .HasMaxLength(1)
                .HasColumnName("description");
            entity.Property(e => e.FirstReview).HasColumnName("first_review");
            entity.Property(e => e.HasAvailability).HasColumnName("has_availability");
            entity.Property(e => e.HostAbout)
                .IsUnicode(false)
                .HasColumnName("host_about");
            entity.Property(e => e.HostAcceptanceRate)
                .HasMaxLength(50)
                .HasColumnName("host_acceptance_rate");
            entity.Property(e => e.HostHasProfilePic).HasColumnName("host_has_profile_pic");
            entity.Property(e => e.HostId).HasColumnName("host_id");
            entity.Property(e => e.HostIdentityVerified).HasColumnName("host_identity_verified");
            entity.Property(e => e.HostIsSuperhost).HasColumnName("host_is_superhost");
            entity.Property(e => e.HostListingsCount).HasColumnName("host_listings_count");
            entity.Property(e => e.HostLocation)
                .IsUnicode(false)
                .HasColumnName("host_location");
            entity.Property(e => e.HostName)
                .IsUnicode(false)
                .HasColumnName("host_name");
            entity.Property(e => e.HostNeighbourhood)
                .IsUnicode(false)
                .HasColumnName("host_neighbourhood");
            entity.Property(e => e.HostPictureUrl)
                .IsUnicode(false)
                .HasColumnName("host_picture_url");
            entity.Property(e => e.HostResponseRate)
                .HasMaxLength(50)
                .HasColumnName("host_response_rate");
            entity.Property(e => e.HostResponseTime)
                .HasMaxLength(50)
                .HasColumnName("host_response_time");
            entity.Property(e => e.HostSince).HasColumnName("host_since");
            entity.Property(e => e.HostThumbnailUrl)
                .IsUnicode(false)
                .HasColumnName("host_thumbnail_url");
            entity.Property(e => e.HostTotalListingsCount).HasColumnName("host_total_listings_count");
            entity.Property(e => e.HostUrl)
                .IsUnicode(false)
                .HasColumnName("host_url");
            entity.Property(e => e.HostVerifications)
                .HasMaxLength(50)
                .HasColumnName("host_verifications");
            entity.Property(e => e.InstantBookable).HasColumnName("instant_bookable");
            entity.Property(e => e.LastReview).HasColumnName("last_review");
            entity.Property(e => e.LastScraped).HasColumnName("last_scraped");
            entity.Property(e => e.Latitude).HasColumnName("latitude");
            entity.Property(e => e.License)
                .HasColumnType("text")
                .HasColumnName("license");
            entity.Property(e => e.ListingUrl)
                .IsUnicode(false)
                .HasColumnName("listing_url");
            entity.Property(e => e.Longitude).HasColumnName("longitude");
            entity.Property(e => e.MaximumMaximumNights).HasColumnName("maximum_maximum_nights");
            entity.Property(e => e.MaximumMinimumNights).HasColumnName("maximum_minimum_nights");
            entity.Property(e => e.MaximumNights).HasColumnName("maximum_nights");
            entity.Property(e => e.MaximumNightsAvgNtm).HasColumnName("maximum_nights_avg_ntm");
            entity.Property(e => e.MinimumMaximumNights).HasColumnName("minimum_maximum_nights");
            entity.Property(e => e.MinimumMinimumNights).HasColumnName("minimum_minimum_nights");
            entity.Property(e => e.MinimumNights).HasColumnName("minimum_nights");
            entity.Property(e => e.MinimumNightsAvgNtm).HasColumnName("minimum_nights_avg_ntm");
            entity.Property(e => e.Name)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.NeighborhoodOverview)
                .IsUnicode(false)
                .HasColumnName("neighborhood_overview");
            entity.Property(e => e.Neighbourhood)
                .IsUnicode(false)
                .HasColumnName("neighbourhood");
            entity.Property(e => e.NeighbourhoodCleansed)
                .IsUnicode(false)
                .HasColumnName("neighbourhood_cleansed");
            entity.Property(e => e.NeighbourhoodGroupCleansed)
                .HasMaxLength(1)
                .HasColumnName("neighbourhood_group_cleansed");
            entity.Property(e => e.NumberOfReviews).HasColumnName("number_of_reviews");
            entity.Property(e => e.NumberOfReviewsL30d).HasColumnName("number_of_reviews_l30d");
            entity.Property(e => e.NumberOfReviewsLtm).HasColumnName("number_of_reviews_ltm");
            entity.Property(e => e.PictureUrl)
                .IsUnicode(false)
                .HasColumnName("picture_url");
            entity.Property(e => e.Price)
                .HasColumnType("text")
                .HasColumnName("price");
            entity.Property(e => e.PropertyType)
                .HasMaxLength(50)
                .HasColumnName("property_type");
            entity.Property(e => e.ReviewScoresAccuracy).HasColumnName("review_scores_accuracy");
            entity.Property(e => e.ReviewScoresCheckin).HasColumnName("review_scores_checkin");
            entity.Property(e => e.ReviewScoresCleanliness).HasColumnName("review_scores_cleanliness");
            entity.Property(e => e.ReviewScoresCommunication).HasColumnName("review_scores_communication");
            entity.Property(e => e.ReviewScoresLocation).HasColumnName("review_scores_location");
            entity.Property(e => e.ReviewScoresRating).HasColumnName("review_scores_rating");
            entity.Property(e => e.ReviewScoresValue).HasColumnName("review_scores_value");
            entity.Property(e => e.ReviewsPerMonth).HasColumnName("reviews_per_month");
            entity.Property(e => e.Price_Formatted).HasColumnName("price_formatted");
            entity.Property(e => e.RoomType)
                .HasMaxLength(50)
                .HasColumnName("room_type");
            entity.Property(e => e.ScrapeId).HasColumnName("scrape_id");
            entity.Property(e => e.Source)
                .IsUnicode(false)
                .HasColumnName("source");
        });

        modelBuilder.Entity<DetailedReviewsParij>(entity =>
        {
            entity.ToTable("Detailed_Reviews_Parijs");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Comments).HasColumnName("comments");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.ListingId).HasColumnName("listing_id");
            entity.Property(e => e.ReviewerId).HasColumnName("reviewer_id");
            entity.Property(e => e.ReviewerName).HasColumnName("reviewer_name");
        });

        modelBuilder.Entity<GeoLocationInfo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__GeoLocat__3214EC0737D75C47");

            entity.ToTable("GeoLocationInfo");

            entity.Property(e => e.Id).ValueGeneratedNever();
        });

        modelBuilder.Entity<Listing>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("listings");

            entity.Property(e => e.Availability365).HasColumnName("availability_365");
            entity.Property(e => e.CalculatedHostListingsCount).HasColumnName("calculated_host_listings_count");
            entity.Property(e => e.HostId).HasColumnName("host_id");
            entity.Property(e => e.HostName)
                .HasMaxLength(50)
                .HasColumnName("host_name");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.LastReview).HasColumnName("last_review");
            entity.Property(e => e.Latitude).HasColumnName("latitude");
            entity.Property(e => e.License)
                .IsUnicode(false)
                .HasColumnName("license");
            entity.Property(e => e.Longitude).HasColumnName("longitude");
            entity.Property(e => e.MinimumNights).HasColumnName("minimum_nights");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.Neighbourhood)
                .HasMaxLength(50)
                .HasColumnName("neighbourhood");
            entity.Property(e => e.NeighbourhoodGroup)
                .HasMaxLength(1)
                .HasColumnName("neighbourhood_group");
            entity.Property(e => e.NumberOfReviews).HasColumnName("number_of_reviews");
            entity.Property(e => e.NumberOfReviewsLtm).HasColumnName("number_of_reviews_ltm");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(8, 3)")
                .HasColumnName("price");
            entity.Property(e => e.ReviewsPerMonth).HasColumnName("reviews_per_month");
            entity.Property(e => e.RoomType)
                .HasMaxLength(50)
                .HasColumnName("room_type");
        });

        modelBuilder.Entity<Neighbourhood>(entity =>
        {
            entity.HasKey(e => e.Neighbourhoodname);

            entity.ToTable("neighbourhoods");

            entity.Property(e => e.Neighbourhoodname)
                .HasMaxLength(50)
                .HasColumnName("neighbourhoodname");
            entity.Property(e => e.NeighbourhoodGroup)
                .HasMaxLength(1)
                .HasColumnName("neighbourhood_group");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("reviews");

            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.ListingId).HasColumnName("listing_id");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

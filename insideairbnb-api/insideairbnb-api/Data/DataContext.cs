﻿//using insideairbnb_api.Entities;
//using Microsoft.EntityFrameworkCore;

//namespace insideairbnb_api.Data
//{
//    public class DataContext : DbContext
//    {


//        public DataContext(DbContextOptions<DataContext> options) : base(options)
//        {

//        }

//        protected override void OnModelCreating(ModelBuilder modelBuilder)
//        {

//            modelBuilder.Entity<GeoLocationListing>().Property(t => t.Id).HasColumnType("long");

//            base.OnModelCreating(modelBuilder);
//        }

//        public DbSet<GeoLocationListing> GeoLocationInfo { get; set; }
//        public DbSet<Neighbourhood> Neighbourhoods { get; set; }
//        public DbSet<Listing> Detailed_Listings_Parijs { get; set; }
//    }
//}

using insideairbnb_api.Data;
using insideairbnb_api.Data.Repositories;
using insideairbnb_api.Factories;
using insideairbnb_api.Interfaces;
using insideairbnb_api.Models;
using insideairbnb_api.Requirements;
using insideairbnb_api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Voeg CORS-beleid toe
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

// 1. Add Authentication Services

var domain = "https://" + builder.Configuration["Auth0:Domain"];
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.Authority = domain;
    options.Audience = builder.Configuration["Auth0:Audience"];
    options.TokenValidationParameters = new TokenValidationParameters
    {
        NameClaimType = ClaimTypes.NameIdentifier,
        RoleClaimType = "permissions" // This might be necessary to map permissions claim correctly
    };
});


// Define the authorization policy
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("read:stats", policy =>
        policy.RequireClaim("permissions", "read:stats"));
});




//builder.Services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<InsideAirBnb2024Context>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionString"));
});

// Voeg DI voor services toe
builder.Services.AddScoped<IListingsService, ListingsServiceImpl>();
// Voeg ISortStrategyFactory toe
builder.Services.AddScoped<ISortStrategyFactory, SortStrategyFactory>();
builder.Services.AddScoped<IListingRepository, ListingRepository>();



var app = builder.Build();

// 2. Enable authentication middleware
app.UseAuthentication();
app.UseAuthorization();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowLocalhost3000");
app.MapControllers();

app.Run();

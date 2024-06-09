using insideairbnb_api.Data;
using insideairbnb_api.Data.Repositories;
using insideairbnb_api.Factories;
using insideairbnb_api.Interfaces;
using insideairbnb_api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Profiling.Storage;
using System.Net;
using System.Security.Claims;
using StackExchange.Redis;

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
                .AllowAnyMethod()
                .WithExposedHeaders("X-Content-Type-Options"); // Expose the header
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

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<InsideAirBnb2024Context>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionString"));
});

builder.Services.AddMiniProfiler(options =>
{
    options.RouteBasePath = "/profiler";
    options.PopupRenderPosition = StackExchange.Profiling.RenderPosition.BottomRight;
    options.PopupShowTimeWithChildren = true;
    options.Storage = new SqlServerStorage(builder.Configuration.GetConnectionString("MiniProfilerDB"));
});



builder.Services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(builder.Configuration.GetConnectionString("RedisConnection")));




// Voeg DI voor services toe
builder.Services.AddScoped<IListingsService, ListingsServiceImpl>();
// Voeg ISortStrategyFactory toe
builder.Services.AddScoped<ISortStrategyFactory, SortStrategyFactory>();
builder.Services.AddScoped<IListingRepository, ListingRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseMiniProfiler();

// Add the X-Content-Type-Options header
app.Use(async (context, next) =>
{
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Append("Strict-Traponsport-Security", "max-age=42848228j4; includeSubDomains");
    await next();
});



// 2. Enable authentication middleware
app.UseAuthentication();
app.UseAuthorization();

app.UseCors("AllowLocalhost3000");
app.MapControllers();

app.Run();

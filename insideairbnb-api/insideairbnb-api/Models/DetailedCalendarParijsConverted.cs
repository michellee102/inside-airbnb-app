using System;
using System.Collections.Generic;

namespace insideairbnb_api.Models;

public partial class DetailedCalendarParijsConverted
{
    public string ListingId { get; set; }

    public DateOnly Date { get; set; }

    public bool Available { get; set; }

    public string? Price { get; set; }

    public string? AdjustedPrice { get; set; }

    public int? MinimumNights { get; set; }

    public int? MaximumNights { get; set; }
}

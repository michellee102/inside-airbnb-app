using System;
using System.Collections.Generic;

namespace insideairbnb_api.Models;

public partial class Review
{
    public long ListingId { get; set; }

    public DateOnly Date { get; set; }
}

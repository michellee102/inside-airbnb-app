using System;
using System.Collections.Generic;

namespace insideairbnb_api.Entities;

public partial class Review
{
    public long ListingId { get; set; }

    public DateOnly Date { get; set; }
}

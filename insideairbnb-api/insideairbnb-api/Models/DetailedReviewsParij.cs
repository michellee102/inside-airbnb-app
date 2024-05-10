using System;
using System.Collections.Generic;

namespace insideairbnb_api.Models;

public partial class DetailedReviewsParij
{
    public long ListingId { get; set; }

    public long Id { get; set; }

    public DateOnly Date { get; set; }

    public int ReviewerId { get; set; }

    public string ReviewerName { get; set; } = null!;

    public string Comments { get; set; } = null!;
}

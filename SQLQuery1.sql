SELECT id, longitude, latitude, review_scores_accuracy
FROM Detailed_Listings_Parijs
WHERE neighbourhood_cleansed = 'Buttes-Chaumont' 
AND review_scores_accuracy LIKE '2%'



SELECT YEAR(dc.Date) AS Year,
       MONTH(dc.Date) AS Month,
       CAST(AVG(CAST(dc.minimum_nights AS FLOAT)) AS INT) AS AverageNights
FROM Detailed_Calendar_Parijs_Converted dc
JOIN Detailed_Listings_Parijs l ON dc.listing_id = l.Id
WHERE l.neighbourhood_cleansed = 'Buttes-Chaumont'
  AND l.review_scores_accuracy LIKE '2%'
  AND dc.Available = 0
GROUP BY YEAR(dc.Date), MONTH(dc.Date)
ORDER BY YEAR(dc.Date), MONTH(dc.Date);

// statisticsSlice.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import { generateFetchUrl } from '../../helpers/GenerateFetchUrl';


export const fetchAverageNightsPerMonth = createAsyncThunk('statistics/fetchAverageNightsPerMonth', async ({ filters, accessToken }) => {
    const response = await fetch(generateFetchUrl('Listings/stats/average-nights-per-month', filters), {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch average nights per month');
    }

    return response.json();
});

export const fetchTotalRevenue = createAsyncThunk('statistics/fetchTotalRevenue', async ({ filters, accessToken }) => {
    const response = await fetch(generateFetchUrl('Listings/stats/revenue-per-month', filters), {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch total revenue');
    }

    return response.json();
});

export const fetchAverageRating = createAsyncThunk('statistics/fetchAverageRating', async ({ filters, accessToken }) => {
    const response = await fetch(generateFetchUrl('Listings/stats/average-rating', filters), {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch average rating');
    }

    return response.json();
});



// Helper function to generate trend data
const generateTrends = (baseValue, months = 6, variance = 5) => {
    const trends = [];
    const monthNames = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 0; i < months; i++) {
        trends.push({
            month: monthNames[i],
            value: baseValue + Math.floor(Math.random() * variance) - variance / 2
        });
    }
    return trends;
};

export const competitors = [
    {
        id: 1,
        name: "TechNova",
        logo: "https://ui-avatars.com/api/?name=TechNova&background=3b82f6&color=fff",
        website: "technova.com",
        marketShare: 35,
        visibility: 63, // For quadrant chart
        sentiment: 85, // For quadrant chart (0-100 scale)
        channels: {
            seo: 85,
            social: 60,
            ads: 45,
            email: 70
        },
        features: ["AI Analytics", "Custom Reports", "API Access"],
        recentActivity: "Launched new mobile app",
        webTraffic: {
            monthlyVisitors: 2500000,
            bounceRate: 42,
            avgSessionDuration: '3m 24s',
            pageViews: 8500000,
            sources: { organic: 45, direct: 25, social: 15, paid: 15 },
            topCountries: ['United States', 'United Kingdom', 'Canada']
        },
        reviews: {
            g2: { rating: 4.5, count: 234, sentiment: 'positive', recentTrend: '+0.2' },
            capterra: { rating: 4.3, count: 156, sentiment: 'positive', recentTrend: '+0.1' },
            trustpilot: { rating: 4.2, count: 89, sentiment: 'neutral', recentTrend: '0' }
        },
        socialMedia: {
            linkedin: { followers: 45000, engagement: 3.2, growth: '+12%' },
            twitter: { followers: 28000, engagement: 2.1, growth: '+8%' },
            facebook: { followers: 15000, engagement: 1.8, growth: '+5%' }
        },
        insights: {
            strengths: ['Strong SEO presence', 'High engagement on LinkedIn', 'Positive review sentiment'],
            weaknesses: ['Lower paid ad performance', 'Moderate social media growth'],
            opportunities: ['Expand paid advertising', 'Increase Twitter presence'],
            threats: ['Competitors gaining in review ratings']
        },
        prompts: [
            { query: "What are the best analytics tools for startups?", visibility: 68, position: 2, sentiment: 88, volume: 15200 },
            { query: "How to track competitor metrics?", visibility: 55, position: 3, sentiment: 82, volume: 8900 },
            { query: "Best CRM with analytics features", visibility: 72, position: 1, sentiment: 90, volume: 12400 }
        ],
        citations: [
            { source: "G2", count: 45, impact: "high", category: "review" },
            { source: "TechCrunch", count: 12, impact: "high", category: "media" },
            { source: "Reddit r/analytics", count: 28, impact: "medium", category: "community" },
            { source: "Product Hunt", count: 18, impact: "medium", category: "community" }
        ],
        trends: {
            visibility: generateTrends(63, 6, 8),
            sentiment: generateTrends(85, 6, 5),
            marketShare: generateTrends(35, 6, 3)
        },
        recommendations: [
            { priority: "high", category: "Content", action: "Create comparison guides targeting 'analytics tools' queries", impact: "+15% visibility" },
            { priority: "high", category: "Community", action: "Increase presence on Reddit r/analytics with helpful content", impact: "Improve citation count" },
            { priority: "medium", category: "Reviews", action: "Encourage G2 reviews to maintain high citation rate", impact: "Sustain ranking" }
        ],
        // Enhanced data for Analysis dashboard
        pricing: {
            tier: "premium",
            startingPrice: 99,
            averagePrice: 249,
            pricingModel: "per-user-monthly"
        },
        revenue: {
            annual: 45000000,
            growth: 28,
            trends: [
                { month: 'Jul', value: 3500000 },
                { month: 'Aug', value: 3650000 },
                { month: 'Sep', value: 3800000 },
                { month: 'Oct', value: 3900000 },
                { month: 'Nov', value: 4100000 },
                { month: 'Dec', value: 4200000 }
            ]
        },
        winLoss: {
            totalDeals: 145,
            wins: 89,
            losses: 56,
            winRate: 61.4,
            avgDealSize: 125000,
            topWinReasons: ['Better features', 'Easier onboarding', 'Superior support'],
            topLossReasons: ['Price', 'Missing integrations']
        },
        customerMetrics: {
            nps: 68,
            satisfaction: 4.4,
            churnRate: 8,
            retentionRate: 92
        }
    },
    {
        id: 2,
        name: "DataFlow",
        logo: "https://ui-avatars.com/api/?name=DataFlow&background=8b5cf6&color=fff",
        website: "dataflow.io",
        marketShare: 25,
        visibility: 58,
        sentiment: 92,
        channels: {
            seo: 65,
            social: 80,
            ads: 75,
            email: 50
        },
        features: ["Real-time Sync", "Team Collaboration"],
        recentActivity: "Price drop by 20%",
        webTraffic: {
            monthlyVisitors: 1800000,
            bounceRate: 38,
            avgSessionDuration: '4m 12s',
            pageViews: 6200000,
            sources: { organic: 35, direct: 20, social: 30, paid: 15 },
            topCountries: ['United States', 'Germany', 'France']
        },
        reviews: {
            g2: { rating: 4.6, count: 312, sentiment: 'positive', recentTrend: '+0.3' },
            capterra: { rating: 4.4, count: 198, sentiment: 'positive', recentTrend: '+0.2' },
            trustpilot: { rating: 4.5, count: 145, sentiment: 'positive', recentTrend: '+0.1' }
        },
        socialMedia: {
            linkedin: { followers: 52000, engagement: 4.1, growth: '+18%' },
            twitter: { followers: 35000, engagement: 3.5, growth: '+15%' },
            facebook: { followers: 22000, engagement: 2.9, growth: '+10%' }
        },
        insights: {
            strengths: ['Excellent social media engagement', 'Strong review ratings', 'High session duration'],
            weaknesses: ['Lower SEO performance', 'Smaller market share'],
            opportunities: ['Improve organic search', 'Capitalize on positive sentiment'],
            threats: ['Recent price drop may indicate pressure']
        },
        prompts: [
            { query: "Best real-time collaboration tools", visibility: 62, position: 2, sentiment: 94, volume: 11800 },
            { query: "Team workflow software comparison", visibility: 51, position: 4, sentiment: 89, volume: 9200 }
        ],
        citations: [
            { source: "Capterra", count: 52, impact: "high", category: "review" },
            { source: "LinkedIn", count: 38, impact: "high", category: "social" },
            { source: "Twitter discussions", count: 31, impact: "medium", category: "social" }
        ],
        trends: {
            visibility: generateTrends(58, 6, 6),
            sentiment: generateTrends(92, 6, 4),
            marketShare: generateTrends(25, 6, 2)
        },
        recommendations: [
            { priority: "high", category: "SEO", action: "Improve organic search rankings for 'collaboration tools'", impact: "+20% visibility" },
            { priority: "medium", category: "Pricing", action: "Highlight value proposition after price drop", impact: "Convert sentiment to sales" }
        ],
        pricing: {
            tier: "mid-market",
            startingPrice: 79,
            averagePrice: 189,
            pricingModel: "per-user-monthly"
        },
        revenue: {
            annual: 32000000,
            growth: 35,
            trends: [
                { month: 'Jul', value: 2400000 },
                { month: 'Aug', value: 2550000 },
                { month: 'Sep', value: 2700000 },
                { month: 'Oct', value: 2850000 },
                { month: 'Nov', value: 2950000 },
                { month: 'Dec', value: 3100000 }
            ]
        },
        winLoss: {
            totalDeals: 198,
            wins: 142,
            losses: 56,
            winRate: 71.7,
            avgDealSize: 85000,
            topWinReasons: ['Best social features', 'Competitive pricing', 'Great UX'],
            topLossReasons: ['Limited enterprise features', 'SEO concerns']
        },
        customerMetrics: {
            nps: 74,
            satisfaction: 4.6,
            churnRate: 6,
            retentionRate: 94
        }
    },
    {
        id: 3,
        name: "MetricMaster",
        logo: "https://ui-avatars.com/api/?name=MetricMaster&background=10b981&color=fff",
        website: "metricmaster.com",
        marketShare: 15,
        visibility: 42,
        sentiment: 65,
        channels: {
            seo: 45,
            social: 50,
            ads: 30,
            email: 80
        },
        features: ["Custom Reports", "SLA Support"],
        recentActivity: "Acquired by BigCorp",
        webTraffic: {
            monthlyVisitors: 950000,
            bounceRate: 48,
            avgSessionDuration: '2m 45s',
            pageViews: 2800000,
            sources: { organic: 40, direct: 30, social: 10, paid: 20 },
            topCountries: ['United States', 'Australia', 'United Kingdom']
        },
        reviews: {
            g2: { rating: 4.1, count: 167, sentiment: 'neutral', recentTrend: '-0.1' },
            capterra: { rating: 4.0, count: 123, sentiment: 'neutral', recentTrend: '0' },
            trustpilot: { rating: 3.9, count: 78, sentiment: 'neutral', recentTrend: '-0.2' }
        },
        socialMedia: {
            linkedin: { followers: 28000, engagement: 2.1, growth: '+5%' },
            twitter: { followers: 15000, engagement: 1.5, growth: '+3%' },
            facebook: { followers: 8000, engagement: 1.2, growth: '+2%' }
        },
        insights: {
            strengths: ['Strong email marketing', 'Stable direct traffic'],
            weaknesses: ['Declining review ratings', 'Low social engagement', 'Smallest market share'],
            opportunities: ['Leverage acquisition for growth', 'Improve product based on reviews'],
            threats: ['Losing ground to competitors', 'Post-acquisition uncertainty']
        },
        prompts: [
            { query: "Enterprise reporting tools", visibility: 38, position: 5, sentiment: 68, volume: 7200 },
            { query: "SLA monitoring software", visibility: 45, position: 3, sentiment: 72, volume: 5800 }
        ],
        citations: [
            { source: "G2", count: 22, impact: "medium", category: "review" },
            { source: "Industry blogs", count: 15, impact: "low", category: "media" }
        ],
        trends: {
            visibility: generateTrends(42, 6, 5),
            sentiment: generateTrends(65, 6, 8),
            marketShare: generateTrends(15, 6, 2)
        },
        recommendations: [
            { priority: "high", category: "Product", action: "Address declining review sentiment with product improvements", impact: "Prevent churn" },
            { priority: "high", category: "Acquisition", action: "Leverage BigCorp resources for market expansion", impact: "+10% market share" },
            { priority: "medium", category: "Community", action: "Build presence in industry forums and communities", impact: "Increase citations" }
        ],
        pricing: {
            tier: "enterprise",
            startingPrice: 149,
            averagePrice: 399,
            pricingModel: "per-user-monthly"
        },
        revenue: {
            annual: 18000000,
            growth: 12,
            trends: [
                { month: 'Jul', value: 1450000 },
                { month: 'Aug', value: 1480000 },
                { month: 'Sep', value: 1500000 },
                { month: 'Oct', value: 1520000 },
                { month: 'Nov', value: 1550000 },
                { month: 'Dec', value: 1600000 }
            ]
        },
        winLoss: {
            totalDeals: 87,
            wins: 38,
            losses: 49,
            winRate: 43.7,
            avgDealSize: 185000,
            topWinReasons: ['Enterprise features', 'SLA guarantees', 'Compliance'],
            topLossReasons: ['High price', 'Poor UX', 'Slow innovation']
        },
        customerMetrics: {
            nps: 52,
            satisfaction: 3.9,
            churnRate: 14,
            retentionRate: 86
        }
    }
];

export const recentSearches = [
    { id: 'f1', name: 'CRM Market Q4', count: 12, date: '2 days ago' },
    { id: 'f2', name: 'Fintech Competitors', count: 8, date: 'Last week' },
    { id: 'f3', name: 'EdTech Analysis', count: 24, date: 'Oct 24, 2024' },
    { id: 'f4', name: 'AI Startups 2025', count: 5, date: 'Yesterday' },
];

export const calculateInsights = () => {
    return [
        {
            id: 1,
            title: "SEO Domination",
            description: "TechNova is dominating organic search visibility, capturing 85% of high-intent keywords.",
            competitor: "TechNova",
            category: "SEO",
            impact: "high",
            metric: "85% Visibility",
            trend: "up"
        },
        {
            id: 2,
            title: "Ad Spend Surge",
            description: "DataFlow has aggressively increased social ad spend by 15% this month, targeting your key demographics.",
            competitor: "DataFlow",
            category: "Advertising",
            impact: "medium",
            metric: "+15% Spend",
            trend: "up"
        },
        {
            id: 3,
            title: "Engagement Spike",
            description: "MetricMaster email open rates are trending up, indicating a successful new nurturing campaign.",
            competitor: "MetricMaster",
            category: "Email",
            impact: "medium",
            metric: "22% Open Rate",
            trend: "up"
        }
    ];
};

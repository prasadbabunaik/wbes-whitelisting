import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

// Revenue Chart Data
const allRevenueData = [
  {
    name: "Current",
    data: [18, 21, 45, 36, 65, 84, 97, 78, 54, 85, 41, 36],
  },
  {
    name: "Previous",
    data: [30, 11, 22, 18, 32, 23, 58, 45, 30, 47, 15, 10],
  },
];

const monthRevenueData = [
  {
    name: "Current",
    data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
  },
  {
    name: "Previous",
    data: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115],
  },
];

const halfYearRevenueData = [
  {
    name: "Current",
    data: [50, 60, 70, 80, 90, 100],
  },
  {
    name: "Previous",
    data: [40, 50, 60, 70, 80, 90],
  },
];

const yearRevenueData = [
  {
    name: "Current",
    data: [100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320],
  },
  {
    name: "Previous",
    data: [80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300],
  },
];

// Sales Forecast Data
const octSalesData = [
  {
    name: "This year",
    data: [10, 20, 15, 30, 20, 25, 18, 20, 25, 20, 30, 20],
  },
  {
    name: "Last year",
    data: [20, 15, 8, 15, 10, 12, 10, 15, 10, 15, 10, 12],
  },
];

const novSalesData = [
  {
    name: "This year",
    data: [12, 25, 18, 32, 22, 27, 20, 22, 27, 22, 32, 22],
  },
  {
    name: "Last year",
    data: [22, 17, 10, 17, 12, 14, 12, 17, 12, 17, 12, 14],
  },
];

const decSalesData = [
  {
    name: "This year",
    data: [15, 28, 20, 35, 25, 30, 22, 25, 30, 25, 35, 25],
  },
  {
    name: "Last year",
    data: [25, 20, 12, 20, 15, 17, 15, 20, 15, 20, 15, 17],
  },
];

const janSalesData = [
  {
    name: "This year",
    data: [18, 30, 22, 38, 28, 33, 25, 28, 33, 28, 38, 28],
  },
  {
    name: "Last year",
    data: [28, 22, 14, 22, 18, 20, 18, 22, 18, 22, 18, 20],
  },
];

// Deal Type Data
const todayDealData = [
  {
    name: "Series A",
    data: [80, 50, 30, 40, 100, 20],
  },
];

const weeklyDealData = [
  {
    name: "Series A",
    data: [70, 60, 40, 50, 90, 30],
  },
];

const monthlyDealData = [
  {
    name: "Series A",
    data: [60, 70, 50, 60, 80, 40],
  },
];

const yearlyDealData = [
  {
    name: "Series A",
    data: [50, 80, 60, 70, 70, 50],
  },
];

// Balance Overview Data
const todayBalanceData = [
  {
    name: "This year",
    data: [10, 20, 15, 30, 20, 25, 18, 20, 25, 20, 30, 20],
  },
  {
    name: "Last year",
    data: [20, 15, 8, 15, 10, 12, 10, 15, 10, 15, 10, 12],
  },
];

const lastWeekBalanceData = [
  {
    name: "This year",
    data: [12, 25, 18, 32, 22, 27, 20, 22, 27, 22, 32, 22],
  },
  {
    name: "Last year",
    data: [22, 17, 10, 17, 12, 14, 12, 17, 12, 17, 12, 14],
  },
];

const lastMonthBalanceData = [
  {
    name: "This year",
    data: [15, 28, 20, 35, 25, 30, 22, 25, 30, 25, 35, 25],
  },
  {
    name: "Last year",
    data: [25, 20, 12, 20, 15, 17, 15, 20, 15, 20, 15, 17],
  },
];

const currentYearBalanceData = [
  {
    name: "This year",
    data: [18, 30, 22, 38, 28, 33, 25, 28, 33, 28, 38, 28],
  },
  {
    name: "Last year",
    data: [28, 22, 14, 22, 18, 20, 18, 22, 18, 22, 18, 20],
  },
];

mock.onGet("/allRevenue-data").reply(200, allRevenueData);
mock.onGet("/monthRevenue-data").reply(200, monthRevenueData);
mock.onGet("/halfYearRevenue-data").reply(200, halfYearRevenueData);
mock.onGet("/yearRevenue-data").reply(200, yearRevenueData);

mock.onGet("/octSales-data").reply(200, octSalesData);
mock.onGet("/novSales-data").reply(200, novSalesData);
mock.onGet("/decSales-data").reply(200, decSalesData);
mock.onGet("/janSales-data").reply(200, janSalesData);

mock.onGet("/todayDeal-data").reply(200, todayDealData);
mock.onGet("/weeklyDeal-data").reply(200, weeklyDealData);
mock.onGet("/monthlyDeal-data").reply(200, monthlyDealData);
mock.onGet("/yearlyDeal-data").reply(200, yearlyDealData);

mock.onGet("/todayBalance-data").reply(200, todayBalanceData);
mock.onGet("/lastWeekBalance-data").reply(200, lastWeekBalanceData);
mock.onGet("/lastMonthBalance-data").reply(200, lastMonthBalanceData);
mock.onGet("/currentYearBalance-data").reply(200, currentYearBalanceData);

// User Device Data
const todayDeviceData = [44, 55, 41];
const lastWeekDeviceData = [30, 40, 50];
const lastMonthDeviceData = [20, 30, 40];
const currentYearDeviceData = [50, 60, 70];

mock.onGet("/todayDevice-data").reply(200, todayDeviceData);
mock.onGet("/lastWeekDevice-data").reply(200, lastWeekDeviceData);
mock.onGet("/lastMonthDevice-data").reply(200, lastMonthDeviceData);
mock.onGet("/currentYearDevice-data").reply(200, currentYearDeviceData);

// Audiences Metrics Data
const allAudiencesMetricsData = [
  {
    name: "Views",
    data: [40, 20, 80, 10, 30, 27, 100],
  },
  {
    name: "Clicks",
    data: [20, 80, 10, 30, 27, 100, 40],
  },
];

const monthlyAudiencesMetricsData = [
  {
    name: "Views",
    data: [30, 10, 70, 5, 20, 17, 90],
  },
  {
    name: "Clicks",
    data: [10, 70, 5, 20, 17, 90, 30],
  },
];

const halfYearlyAudiencesMetricsData = [
  {
    name: "Views",
    data: [50, 30, 90, 20, 40, 37, 110],
  },
  {
    name: "Clicks",
    data: [30, 90, 20, 40, 37, 110, 50],
  },
];

const yearlyAudiencesMetricsData = [
  {
    name: "Views",
    data: [60, 40, 100, 30, 50, 47, 120],
  },
  {
    name: "Clicks",
    data: [40, 100, 30, 50, 47, 120, 60],
  },
];

mock.onGet("/allAudiencesMetrics-data").reply(200, allAudiencesMetricsData);
mock
  .onGet("/monthlyAudiencesMetrics-data")
  .reply(200, monthlyAudiencesMetricsData);
mock
  .onGet("/halfyearlyAudiencesMetrics-data")
  .reply(200, halfYearlyAudiencesMetricsData);
mock
  .onGet("/yearlyAudiencesMetrics-data")
  .reply(200, yearlyAudiencesMetricsData);

// Audiences Sessions Data
const todaySessionData = [
  {
    name: "Sessions",
    data: [10, 20, 15, 30, 20, 25, 18, 20, 25, 20, 30, 20],
  },
];

const lastWeekSessionData = [
  {
    name: "Sessions",
    data: [12, 25, 18, 32, 22, 27, 20, 22, 27, 22, 32, 22],
  },
];

const lastMonthSessionData = [
  {
    name: "Sessions",
    data: [15, 28, 20, 35, 25, 30, 22, 25, 30, 25, 35, 25],
  },
];

const currentYearSessionData = [
  {
    name: "Sessions",
    data: [18, 30, 22, 38, 28, 33, 25, 28, 33, 28, 38, 28],
  },
];

mock.onGet("/todaySession-data").reply(200, todaySessionData);
mock.onGet("/lastWeekSession-data").reply(200, lastWeekSessionData);
mock.onGet("/lastMonthSession-data").reply(200, lastMonthSessionData);
mock.onGet("/currentYearSession-data").reply(200, currentYearSessionData);

// Live Users Data
const allData = [
  {
    name: "Sessions",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  },
];

const halfyearlyData = [
  {
    name: "Sessions",
    data: [30, 51, 49, 62, 69, 91],
  },
];

const monthlyData = [
  {
    name: "Sessions",
    data: [41, 35, 51, 49, 62, 69],
  },
];

// Portfolio Data
const btcPortfolioData = [98, 72, 62, 89];
const usdPortfolioData = [80, 60, 70, 90];
const euroPortfolioData = [70, 50, 80, 60];

mock.onGet("/all-data").reply(200, allData);
mock.onGet("/halfyearly-data").reply(200, halfyearlyData);
mock.onGet("/monthly-data").reply(200, monthlyData);

mock.onGet("/btcPortfolio-data").reply(200, btcPortfolioData);
mock.onGet("/usdPortfolio-data").reply(200, usdPortfolioData);
mock.onGet("/euroPortfolio-data").reply(200, euroPortfolioData);

// Market Graph Data
const allMarketData = [
  {
    name: "Market Data",
    data: [
      [1627296000000, 37.5, 38.15, 36.96, 37.37],
      [1627382400000, 37.38, 37.58, 37.2, 37.46],
      [1627468800000, 37.5, 37.84, 37.1, 37.3],
      [1627555200000, 37.2, 37.47, 37.05, 37.22],
      [1627641600000, 37.2, 37.3, 37.1, 37.2],
    ],
  },
];

// Mock endpoints for crypto market graph
mock.onGet("/allMarket-data").reply(200, allMarketData);
mock.onGet("/yearMarket-data").reply(200, allMarketData);
mock.onGet("/monthMarket-data").reply(200, allMarketData);
mock.onGet("/weekMarket-data").reply(200, allMarketData);
mock.onGet("/hourMarket-data").reply(200, allMarketData);

// Marketplace Data
const allMarketplaceData = [
  {
    name: "Marketplace",
    data: [89, 56, 74, 98, 72, 38, 64, 46, 84, 58, 46, 49],
  },
];

const monthMarketplaceData = [
  {
    name: "Marketplace",
    data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
  },
];

const halfYearMarketplaceData = [
  {
    name: "Marketplace",
    data: [36, 42, 60, 42, 13, 18, 29, 37, 36, 51, 32, 35],
  },
];

const yearMarketplaceData = [
  {
    name: "Marketplace",
    data: [89, 56, 74, 98, 72, 38, 64, 46, 84, 58, 46, 49],
  },
];

mock.onGet("/allMarketplace-data").reply(200, allMarketplaceData);
mock.onGet("/monthMarketplace-data").reply(200, monthMarketplaceData);
mock.onGet("/halfYearMarketplace-data").reply(200, halfYearMarketplaceData);
mock.onGet("/yearMarketplace-data").reply(200, yearMarketplaceData);

// Project Data
const allProjectData = [
  {
    name: "Number of Projects",
    type: "column",
    data: [26, 24, 29, 32, 36, 33, 31, 33, 39, 35, 38, 33],
  },
  {
    name: "Revenue",
    type: "area",
    data: [26, 24, 29, 32, 36, 33, 31, 33, 39, 35, 38, 33],
  },
  {
    name: "Active Projects",
    type: "line",
    data: [26, 24, 29, 32, 36, 33, 31, 33, 39, 35, 38, 33],
  },
];

const monthProjectData = [
  {
    name: "Number of Projects",
    type: "column",
    data: [20, 22, 25, 28, 30, 28, 26, 28, 32, 30, 33, 28],
  },
  {
    name: "Revenue",
    type: "area",
    data: [20, 22, 25, 28, 30, 28, 26, 28, 32, 30, 33, 28],
  },
  {
    name: "Active Projects",
    type: "line",
    data: [20, 22, 25, 28, 30, 28, 26, 28, 32, 30, 33, 28],
  },
];

const halfYearProjectData = [
  {
    name: "Number of Projects",
    type: "column",
    data: [28, 26, 31, 34, 38, 35, 33, 35, 41, 37, 40, 35],
  },
  {
    name: "Revenue",
    type: "area",
    data: [28, 26, 31, 34, 38, 35, 33, 35, 41, 37, 40, 35],
  },
  {
    name: "Active Projects",
    type: "line",
    data: [28, 26, 31, 34, 38, 35, 33, 35, 41, 37, 40, 35],
  },
];

const yearProjectData = [
  {
    name: "Number of Projects",
    type: "column",
    data: [30, 28, 33, 36, 40, 37, 35, 37, 43, 39, 42, 37],
  },
  {
    name: "Revenue",
    type: "area",
    data: [30, 28, 33, 36, 40, 37, 35, 37, 43, 39, 42, 37],
  },
  {
    name: "Active Projects",
    type: "line",
    data: [30, 28, 33, 36, 40, 37, 35, 37, 43, 39, 42, 37],
  },
];

mock.onGet("/allProject-data").reply(200, allProjectData);
mock.onGet("/monthProject-data").reply(200, monthProjectData);
mock.onGet("/halfYearProject-data").reply(200, halfYearProjectData);
mock.onGet("/yearProject-data").reply(200, yearProjectData);

// Project Status Data
const allProjectStatusData = [44, 55, 41, 17];
const weekProjectStatusData = [30, 40, 50, 60];
const monthProjectStatusData = [20, 30, 40, 50];
const quarterProjectStatusData = [50, 60, 70, 80];

mock.onGet("/allProjectStatus-data").reply(200, allProjectStatusData);
mock.onGet("/weekProjectStatus-data").reply(200, weekProjectStatusData);
mock.onGet("/monthProjectStatus-data").reply(200, monthProjectStatusData);
mock.onGet("/quarterProjectStatus-data").reply(200, quarterProjectStatusData);

import { Invoices } from "../common/data/invoice";
mock.onGet("/apps/invoice").reply(200, Invoices);

export default mock;

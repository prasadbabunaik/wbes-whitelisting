import React from "react";
import ReactApexChart from "react-apexcharts";
import useChartColors from "@common/useChartColors";

// SalesForecastCharts: basic bar chart for sales forecast data
const SalesForecastCharts = ({ series }: { series: any[] }) => {
  // Static color palette for series
  const colors = ["#0acf97", "#39afd1"];
  // Static month categories for annual data
  const categories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const options: any = {
    chart: { type: "bar", height: 300, toolbar: { show: false } },
    plotOptions: { bar: { columnWidth: "50%", borderRadius: 4 } },
    dataLabels: { enabled: false },
    xaxis: { categories },
    yaxis: { labels: { formatter: (val: number) => `$${val}k` }, min: 0 },
    colors,
    fill: { opacity: 1 },
    legend: { position: "bottom", horizontalAlign: "center" },
  };
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={300}
      className="apex-charts"
    />
  );
};

const DealTypeCharts = ({ chartId, series }: any) => {
  const chartColors = useChartColors(chartId);

  var options: any = {
    chart: {
      height: 300,
      type: "radar",
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.2,
    },
    legend: {
      show: true,
      fontWeight: 500,
      offsetX: 0,
      offsetY: -8,
      markers: {
        width: 8,
        height: 8,
        radius: 6,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    markers: {
      size: 0,
    },
    colors: chartColors,
    xaxis: {
      categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        id={chartId}
        type="radar"
        height="300"
        data-colors='["--vz-warning", "--vz-danger", "--vz-success"]'
        data-colors-minimal='["--vz-primary-rgb, 0.15", "--vz-primary-rgb, 0.35", "--vz-primary-rgb, 0.45"]'
        data-colors-modern='["--vz-warning", "--vz-secondary", "--vz-success"]'
        data-colors-interactive='["--vz-warning", "--vz-info", "--vz-primary"]'
        data-colors-corporate='["--vz-secondary", "--vz-info", "--vz-success"]'
        data-colors-classic='["--vz-secondary", "--vz-danger", "--vz-success"]'
        className="apex-charts"
      />
    </React.Fragment>
  );
};

const BalanceOverviewCharts = ({ chartId, series }: any) => {
  const chartColors = useChartColors(chartId);

  var options: any = {
    chart: {
      height: 250,
      type: "area",
      toolbar: "false",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: {
        formatter: function (value: any) {
          return "$" + value + "k";
        },
      },
      tickAmount: 5,
      min: 0,
      max: 260,
    },
    colors: chartColors,
    fill: {
      opacity: 0.06,
      colors: chartColors,
      type: "solid",
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        id={chartId}
        type="area"
        height="250"
        data-colors='["--vz-success", "--vz-danger"]'
        data-colors-minimal='["--vz-primary", "--vz-info"]'
        data-colors-interactive='["--vz-info", "--vz-primary"]'
        data-colors-galaxy='["--vz-primary", "--vz-secondary"]'
        data-colors-classic='["--vz-primary", "--vz-secondary"]'
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export { SalesForecastCharts, DealTypeCharts, BalanceOverviewCharts };

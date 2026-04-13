import React from "react";
import ReactApexChart from "react-apexcharts";
import useChartColors from "@common/useChartColors";

const RevenueCharts = ({ chartId, series }: any) => {
  const chartColors = useChartColors(chartId);

  var options: any = {
    chart: {
      height: 370,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "straight",
      dashArray: [0, 0, 8],
      width: [2, 0, 2.2],
    },
    fill: {
      opacity: [0.1, 0.9, 1],
    },
    markers: {
      size: [0, 0, 0],
      strokeWidth: 2,
      hover: {
        size: 4,
      },
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
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    grid: {
      show: true,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        top: 0,
        right: -2,
        bottom: 15,
        left: 10,
      },
    },
    legend: {
      show: true,
      horizontalAlign: "center",
      offsetX: 0,
      offsetY: -5,
      markers: {
        width: 9,
        height: 9,
        radius: 6,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
        barHeight: "70%",
      },
    },
    colors: chartColors,
    tooltip: {
      shared: true,
      y: [
        {
          formatter: function (y: any) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
            }
            return y;
          },
        },
        {
          formatter: function (y: any) {
            if (typeof y !== "undefined") {
              return "$" + y.toFixed(2) + "k";
            }
            return y;
          },
        },
        {
          formatter: function (y: any) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " Sales";
            }
            return y;
          },
        },
      ],
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        id={chartId}
        type="line"
        height="370"
        data-colors='["--vz-primary", "--vz-success", "--vz-danger"]'
        data-colors-minimal='["--vz-light", "--vz-primary", "--vz-info"]'
        data-colors-saas='["--vz-success", "--vz-info", "--vz-danger"]'
        data-colors-modern='["--vz-warning", "--vz-primary", "--vz-success"]'
        data-colors-interactive='["--vz-info", "--vz-primary", "--vz-danger"]'
        data-colors-creative='["--vz-warning", "--vz-primary", "--vz-danger"]'
        data-colors-corporate='["--vz-light", "--vz-primary", "--vz-secondary"]'
        data-colors-galaxy='["--vz-secondary", "--vz-primary", "--vz-primary-rgb, 0.50"]'
        data-colors-classic='["--vz-light", "--vz-primary", "--vz-secondary"]'
        data-colors-vintage='["--vz-success", "--vz-primary", "--vz-secondary"]'
        className="apex-charts"
      />
    </React.Fragment>
  );
};

const StoreVisitsCharts = ({ chartId }: any) => {
  const chartColors = useChartColors(chartId);

  const series = [44, 55, 41, 17, 15];
  var options: any = {
    labels: ["Direct", "Social", "Email", "Other", "Referrals"],
    chart: {
      height: 300,
      type: "donut",
    },
    legend: {
      position: "bottom",
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      dropShadow: {
        enabled: false,
      },
    },
    colors: chartColors,
  };
  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        id={chartId}
        type="donut"
        height="300"
        data-colors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'
        data-colors-minimal='["--vz-primary", "--vz-primary-rgb, 0.85", "--vz-primary-rgb, 0.70", "--vz-primary-rgb, 0.60", "--vz-primary-rgb, 0.45"]'
        data-colors-interactive='["--vz-primary", "--vz-primary-rgb, 0.85", "--vz-primary-rgb, 0.70", "--vz-primary-rgb, 0.60", "--vz-primary-rgb, 0.45"]'
        data-colors-galaxy='["--vz-primary", "--vz-primary-rgb, 0.85", "--vz-primary-rgb, 0.70", "--vz-primary-rgb, 0.60", "--vz-primary-rgb, 0.45"]'
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export { RevenueCharts, StoreVisitsCharts };

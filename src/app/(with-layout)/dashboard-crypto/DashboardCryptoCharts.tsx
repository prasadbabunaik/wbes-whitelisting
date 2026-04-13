import React from "react";
import ReactApexChart from "react-apexcharts";
import useChartColors from "@common/useChartColors";

const PortfolioCharts = ({ chartId, series }: any) => {
  const chartColors = useChartColors(chartId);

  var options: any = {
    labels: ["Bitcoin", "Ethereum", "Litecoin", "Dash"],
    chart: {
      type: "donut",
      height: 224,
    },

    plotOptions: {
      pie: {
        size: 100,
        offsetX: 0,
        offsetY: 0,
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "18px",
              offsetY: -5,
            },
            value: {
              show: true,
              fontSize: "20px",
              color: "#343a40",
              fontWeight: 500,
              offsetY: 5,
              formatter: function (val: any) {
                return "$" + val;
              },
            },
            total: {
              show: true,
              fontSize: "13px",
              label: "Total",
              color: "#9599ad",
              fontWeight: 500,
              formatter: function (w: any) {
                return (
                  "$" +
                  w.globals.seriesTotals.reduce(function (a: any, b: any) {
                    return a + b;
                  }, 0)
                );
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    yaxis: {
      labels: {
        formatter: function (value: any) {
          return "$" + value;
        },
      },
    },
    stroke: {
      lineCap: "round",
      width: 2,
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
        height="224"
        data-colors='["--vz-primary", "--vz-info", "--vz-warning", "--vz-success"]'
        data-colors-minimal='["--vz-primary", "--vz-primary-rgb, 0.85", "--vz-primary-rgb, 0.65", "--vz-primary-rgb, 0.50"]'
        data-colors-interactive='["--vz-primary", "--vz-primary-rgb, 0.85", "--vz-primary-rgb, 0.65", "--vz-primary-rgb, 0.50"]'
        data-colors-corporate='["--vz-primary", "--vz-secondary", "--vz-info", "--vz-success"]'
        data-colors-galaxy='["--vz-primary", "--vz-primary-rgb, 0.85", "--vz-primary-rgb, 0.65", "--vz-primary-rgb, 0.50"]'
        className="apex-charts"
      />
    </React.Fragment>
  );
};

const MarkerCharts = ({ chartId, series }: any) => {
  const chartColors = useChartColors(chartId);

  var options: any = {
    chart: {
      type: "candlestick",
      height: 294,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: chartColors[0],
          downward: chartColors[1],
        },
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: function (value: any) {
          return "$" + value;
        },
      },
    },
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
        type="candlestick"
        height="294"
        data-colors='["--vz-success", "--vz-danger"]'
        data-colors-minimal='["--vz-success-rgb, 0.75", "--vz-danger-rgb, 0.75"]'
        className="apex-charts"
      />
    </React.Fragment>
  );
};

const WidgetsCharts = ({ seriesData, chartsColor }: any) => {
  const areachartlitecoinColors = [chartsColor];
  var options: any = {
    chart: {
      width: 130,
      height: 46,
      type: "area",
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [50, 100, 100, 100],
      },
    },
    colors: areachartlitecoinColors,
  };
  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={[...seriesData]}
        type="area"
        height="46"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export { PortfolioCharts, MarkerCharts, WidgetsCharts };

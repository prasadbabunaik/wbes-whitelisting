import useChartColors from "@components/Common/useChartColors";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const DashboardBlogCharts = ({ chartId }: any) => {
  const chartColors = useChartColors(chartId);

  const series = [
    {
      name: "Visitors",
      data: [2.5, 3.2, 5.0, 10.1, 4.2, 3.8, 3, 2.4, 4.0, 1.2, 3.5, 0.8],
    },
  ];

  const options: any = {
    chart: {
      height: 275,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: string) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#adb5bd"],
      },
    },
    colors: chartColors,
    grid: {
      borderStyle: "dashed",
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
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
    },
    fill: {
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [50, 0, 100, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val: string) {
          return val + "%";
        },
      },
    },
  };

  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        type="bar"
        height={275}
        className="apex-charts"
        data-colors='["--vz-primary"]'
        id={chartId}
      />
    </React.Fragment>
  );
};

const DeviceCharts = ({ chartId }: any) => {
  const chartColors = useChartColors(chartId);

  const series = [44, 55, 24];
  var options: ApexOptions = {
    chart: {
      height: 210,
      type: "donut" as const,
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    labels: ["Desktop", "Mobile", "Laptop"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      formatter: function (
        val: string,
        opts: {
          w: { globals: { series: { [x: string]: string } } };
          seriesIndex: string | number;
        }
      ) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex];
      },
      position: "bottom",
    },
    colors: chartColors,
  };

  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        type="donut"
        height={210}
        className="apex-charts"
        id={chartId}
        data-colors='["--vz-primary", "--vz-success", "--vz-warning"]'
      />
    </React.Fragment>
  );
};

export { DashboardBlogCharts, DeviceCharts };

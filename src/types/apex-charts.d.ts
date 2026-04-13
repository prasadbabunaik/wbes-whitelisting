declare module "react-apexcharts" {
  import { Component } from "react";

  // Common ApexChart types
  export interface ApexOptions {
    chart?: any;
    colors?: string[];
    labels?: string[];
    stroke?: any;
    fill?: any;
    dataLabels?: any;
    grid?: any;
    xaxis?: any;
    yaxis?: any;
    legend?: any;
    plotOptions?: any;
    markers?: any;
    tooltip?: any;
    theme?: any;
    title?: any;
    subtitle?: any;
    [key: string]: any;
  }

  export interface ApexDropShadow {
    enabled?: boolean;
    top?: number;
    left?: number;
    blur?: number;
    opacity?: number;
    color?: string;
  }

  export interface ApexChartProps {
    type?:
      | "line"
      | "area"
      | "bar"
      | "histogram"
      | "pie"
      | "donut"
      | "radialBar"
      | "scatter"
      | "bubble"
      | "heatmap"
      | "candlestick"
      | "boxPlot"
      | "radar"
      | "polarArea";
    series: any[];
    width?: string | number;
    height?: string | number;
    options?: ApexOptions;
    [key: string]: any;
  }

  export default class ReactApexChart extends Component<ApexChartProps> {}
}

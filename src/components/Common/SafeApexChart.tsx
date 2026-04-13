"use client";

import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

/**
 * Deep clone function to create mutable copies of objects
 * Handles frozen objects by creating new extensible objects
 */
function deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime()) as unknown as T;
    }

    if (obj instanceof Array) {
        return obj.map(item => deepClone(item)) as unknown as T;
    }

    if (typeof obj === "object") {
        // Create a new extensible object
        const cloned = Object.create(Object.getPrototypeOf(obj)) as T;
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                cloned[key] = deepClone(obj[key]);
            }
        }
        return cloned;
    }

    return obj;
}

// Use React.ComponentProps to get the exact prop types from ReactApexChart
type SafeApexChartProps = React.ComponentProps<typeof ReactApexChart>;

/**
 * Safe wrapper for ReactApexChart that handles frozen objects
 * by creating deep clones of options and series before passing to ApexCharts
 */
const SafeApexChart: React.FC<SafeApexChartProps> = ({
    options,
    series,
    ...restProps
}) => {
    // Deep clone options and series to ensure they're mutable
    const clonedOptions = useMemo(() => {
        return options ? deepClone(options) : undefined;
    }, [options]);

    const clonedSeries = useMemo(() => {
        return series ? deepClone(series) : [];
    }, [series]);

    return (
        <ReactApexChart
            options={clonedOptions}
            series={clonedSeries}
            {...restProps}
        />
    );
};

export default SafeApexChart;


const path = require("path");

const silenceDeprecations = [
  "import",
  "mixed-decls",
  "color-functions",
  "global-builtin",
  // Suppress legacy JS API deprecation warning
  "legacy-js-api",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Use webpack instead of Turbopack for better Sass support
  // turbopack: {},
  webpack: config => {
    // Replace react-apexcharts with our safe version to handle frozen objects
    // This prevents "Cannot add property group, object is not extensible" errors
    // by deep cloning frozen objects before passing to ApexCharts
    const safeApexChartsPath = path.resolve(__dirname, "src/lib/react-apexcharts-safe.tsx");
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-apexcharts": safeApexChartsPath,
    };
    
    // Exclude our safe wrapper from the alias to prevent circular dependency
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-apexcharts-original": path.resolve(__dirname, "node_modules/react-apexcharts"),
    };
    
    // Handle asset files like fonts and images
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      type: "asset",
    });

    // Patch sass-loader to silence deprecation warnings and add includePaths
    config.module.rules.forEach(rule => {
      if (Array.isArray(rule.oneOf)) {
        rule.oneOf.forEach(one => {
          if (
            one.use &&
            one.use.find &&
            one.use.find(u => u.loader && u.loader.includes("sass-loader"))
          ) {
            one.use.forEach(u => {
              if (u.loader && u.loader.includes("sass-loader")) {
                u.options = {
                  ...u.options,
                  sassOptions: {
                    ...u.options?.sassOptions,
                    silenceDeprecations,
                    includePaths: [
                      ...(u.options?.sassOptions?.includePaths || []),
                      path.resolve(__dirname, "node_modules/bootstrap/scss"),
                    ],
                  },
                };
              }
            });
          }
        });
      }
    });

    return config;
  },
};

module.exports = nextConfig;

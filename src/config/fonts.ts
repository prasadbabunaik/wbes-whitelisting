import localFont from "next/font/local";

export const hkGrotesk = localFont({
  src: [
    {
      path: "/fonts/hkgrotesk-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/hkgrotesk-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/hkgrotesk-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "/fonts/hkgrotesk-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "/fonts/hkgrotesk-light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-hkgrotesk",
  display: "swap",
});

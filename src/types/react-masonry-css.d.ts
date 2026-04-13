declare module "react-masonry-css" {
  import * as React from "react";

  interface MasonryProps {
    breakpointCols?: number | { [key: number]: number };
    className?: string;
    columnClassName?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler;
    onKeyDown?: React.KeyboardEventHandler;
  }

  export default class Masonry extends React.Component<MasonryProps> {}
}

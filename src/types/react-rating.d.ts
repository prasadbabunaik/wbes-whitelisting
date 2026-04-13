declare module "react-rating" {
  import * as React from "react";

  interface RatingProps {
    initialRating?: number;
    readonly?: boolean;
    emptySymbol?: React.ReactNode | Array<React.ReactNode> | string;
    fullSymbol?: React.ReactNode | Array<React.ReactNode> | string;
    placeholderSymbol?: React.ReactNode | Array<React.ReactNode> | string;
    fractions?: number;
    stop?: number;
    start?: number;
    step?: number;
    onChange?: (value: number) => void;
    onHover?: (value: number) => void;
    placeholderRating?: number;
    quiet?: boolean;
    direction?: string;
  }

  class Rating extends React.Component<RatingProps> {}

  export default Rating;
}

declare module "react-dual-listbox" {
  import { ReactNode } from "react";

  interface BaseOption {
    label: string;
    [key: string]: unknown;
  }

  interface Option extends BaseOption {
    value: string;
  }

  interface OptionGroup extends BaseOption {
    options: Option[];
  }

  type OptionType = Option | OptionGroup;

  export interface DualListBoxProps {
    options: OptionType[];
    selected: string[];
    onChange: (selected: string[]) => void;
    canFilter?: boolean;
    filterCallback?: (option: OptionType, filterInput: string) => boolean;
    filterPlaceholder?: string;
    icons?: {
      moveLeft?: ReactNode;
      moveAllLeft?: ReactNode[];
      moveRight?: ReactNode;
      moveAllRight?: ReactNode[];
      moveUp?: ReactNode;
      moveDown?: ReactNode;
      moveTop?: ReactNode;
      moveBottom?: ReactNode;
    };
    [key: string]: unknown;
  }

  const DualListBox: React.FC<DualListBoxProps>;

  export default DualListBox;
}

declare module "src/layouts/LayoutMenuData" {
  const navdata: () => {
    props: {
      children: Array<{
        isHeader?: boolean;
        label: string;
        icon?: string;
        link?: string;
        click?: (e: any) => void;
        stateVariables?: boolean;
        subItems?: Array<{
          id: string | number;
          label: string;
          link?: string;
          parentId: string;
          isChildItem?: boolean;
          click?: (e: any) => void;
          stateVariables?: boolean;
          childItems?: Array<{
            id: string | number;
            label: string;
            link: string;
            parentId?: string;
          }>;
        }>;
        badgeName?: string;
        badgeColor?: string;
      }>;
    };
  };
  export default navdata;
}

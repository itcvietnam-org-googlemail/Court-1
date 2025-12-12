import '@mui/material/Paper';
import '@mui/material/Button';
import '@mui/material/Box';
import '@mui/system';
import '@mui/material/styles';

declare module '@mui/material/Box' {
  interface BoxOwnProps {
    variant?: 'compact';
  }
  interface BoxPropsVariantOverrides {
    compact: true;
  }
}
declare module '@mui/material/styles' {
  interface Components {
    MuiBox?: {
      styleOverrides?: {
        root?: {
          variants?: Array<{
            props: Record<string, unknown>;
            style: React.CSSProperties;
          }>;
        }
      };
      variants?: Array<{
        props: Record<string, unknown>;
        style: React.CSSProperties;
      }>;
    };
  }
}

declare module '@mui/material/Paper' {
  interface PaperOwnProps {
    feature?: 'menu';
  }

  interface PaperPropsVariantOverrides {
    main: true;
    mainroot: true;
  }
}

declare module '@mui/material/List' {
  interface ListOwnProps {
    feature?: 'menu';
    variant?: 'default'
  }

  interface ListPropsVariantOverrides {
    //default: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonOwnProps {
    feature?: 'btn';
  }

  interface ButtonPropsVariantOverrides {
    custom: true;
    my: true
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    style: {
      menu: React.CSSProperties;
    };
    feature: {
      menu: React.CSSProperties;
    };
    feature?: never;

    menu: {
      main: string;
    };
  }
  // allow configuration using `createTheme()`
  interface ThemeOptions {
    style?: {
      menu?: React.CSSProperties;
    };
    feature?: {
      menu?: React.CSSProperties;
    };

    menu?: {
      main?: string;
    };
  }

  interface Palette {
    darker: Palette['primary'];
    c: PaletteColor;
  }

  interface PaletteOptions {
    darker?: PaletteOptions['primary'];
    c?: PaletteColor;
  }

  interface TypographyVariants {
    title: React.CSSProperties;
  }

  // allow configuration using `createTheme()`
  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
  }
}
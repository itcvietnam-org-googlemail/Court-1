import '@mui/material/Button';
import '@mui/material/Box';
import '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonOwnProps {
    feature?: 'btn';
  }

  interface ButtonPropsVariantOverrides {
    custom: true;
    my: true
  }
}

declare module '@mui/material/Box' {
  interface BoxProps {
    feature?: 'box';
    variant?: 'c';
  }

  interface BoxPropsVariantOverrides {
    c: true;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    MuiBox?: {
      defaultProps?: Partial<import('@mui/material/Box').BoxProps>;
      styleOverrides?: import('@mui/material/styles').ComponentStyleOverrides<import('@mui/material/Box').BoxProps>;
      variants?: import('@mui/material/styles').ComponentVariants<import('@mui/material/Box').BoxProps>;
    };
  }
}
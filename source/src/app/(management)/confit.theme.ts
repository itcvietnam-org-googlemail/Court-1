'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    cssVariables: true,

    //unstable_sxConfig: {},

    style: {
        menu: {
            color: 'blue',
            fontWeight: 'bold'
        }
    },

    feature: {
        menu: {
            color: '#f00000'
        }
    },

    menu: {
        main: 'blue'
    },
    palette: {
        c: '#f0f0f0',
        darker: {
            main: '#f00000'
        },
        background: {
            paper: '#cccccc'
        }
    },
    typography: {
        title: {
            fontSize: '24px'
        }
    },
    components: {
        MuiBox: {
            styleOverrides: {
                root: {
                    variants: [
                        {
                            props: {
                                variant: 'compact'
                            },
                            style: {
                                color: 'red'
                            }
                        }
                    ]
                }
            }
        },
        MuiList: {
            variants: [
                {
                    props: {
                        feature: 'menu'
                    },
                    style: {
                        background: 'gray'
                    }
                },
                {
                    props: {
                        feature: 'menu',
                        variant: 'default'
                    },
                    style: {
                        color: 'white',
                        background: 'green'
                    }
                }
            ]
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    variants: [
                        {
                            props: {
                                feature: 'menu'
                            },
                            style: {
                                background: 'yellow'
                            }
                        },
                        {
                            props: {
                                variant: 'mainroot',
                                feature: 'menu'
                            },
                            style: {
                                color: 'red'
                            }
                        }
                    ]
                }
            },
            variants: [
                {
                    props: {
                        feature: 'menu'
                    },
                    style: {
                        background: 'gray'
                    }
                },
                {
                    props: {
                        variant: 'main',
                        feature: 'menu'
                    },
                    style: {
                        color: 'green'
                    }
                }
            ]
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    variants: [
                        {
                            props: {
                                variant: 'custom'
                            },
                            style: {
                                border: '5px solid yellow',
                                color: 'red'
                            },
                        },
                        {
                            props: {
                                variant: 'my'
                            },
                            style: {
                                color: 'gray'
                            },
                        },
                        {
                            props: {
                                variant: 'custom',
                                feature: 'btn'
                            },
                            style: {
                                border: '2px solid green',
                                background: '#ccc'
                            },
                        },
                    ],
                },
            },
        },
    },
});
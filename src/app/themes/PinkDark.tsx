import { alpha, createTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
        custom: any;
    }
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
        props?: any;
        custom?: any;
    }
    interface Components {
        MuiPickerStaticWrapper?: any;
        MuiCalendarPicker?: any;
        MuiPickersDay?: {
            gradients: any;
        };
    }
}

const dark = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: '#e84b4d',
        },
        secondary: {
            main: '#ffffff',
        },
        error: {
            main: '#bd1d11',
        },
        info: {
            main: "#ffffff",
        },
    },
    custom: {
        gradients: {
            button: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        }
    }
});

const light = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: '#ababab',

        },
        secondary: {
            main: '#ffffff',
        },
        error: {
            main: '#bd1d11',
        },
        info: {
            main: "#ffffff",
        },
    },
    custom: {
        gradients: {
            button: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        }
    }
});

const components = (palette: any) => createTheme(palette, {
    typography: {
        button: {
            letterSpacing: '0.19em',
            fontSize: '0.82rem',
        },
    },
    components: {
        MuiPickerStaticWrapper: {
            styleOverrides: {
                root: {
                    "& > div >  div:not(.PrivatePickersToolbar-root)": {
                        margin: 0,
                        width: "100%"
                    },
                },
            }
        },
        MuiCalendarPicker: {
            styleOverrides: {
                root: {
                    "& div": {
                        justifyContent: "space-between"
                    },
                    "& > :last-child": {
                        margin: "0 12px",
                    },
                    margin: 0,
                    width: "100%",
                    maxWidth: "100%",
                    color: palette.palette.text.secondary
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                thumb: {
                    width: 24,
                    height: 24
                },
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    border: 0,
                    borderRadius: 999,
                    height: "auto",
                    padding: '5px 15px',
                },
            }

        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    maxWidth: 'sm'
                }
            }
        },
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                    width: "100%"
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                root: {
                    "& .MuiPaper-root ": {
                        backgroundImage: "none",
                        border: "none",
                        boxShadow: "none",
                    }

                }
            }
        }
    },
    props: {
        MuiAppBar: {
            color: 'transparent',
        },
        MuiTooltip: {
            arrow: true,
        },
    },
});

export const PinkDark = components(dark)

export const PinkLight = components(light)
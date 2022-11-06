import { DefaultTheme } from "react-native-paper";
export const COLOURS = {
    text: 'white',
  };
  
export const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...COLOURS,
    }}
import { createMuiTheme } from "@material-ui/core";

export const tabletheme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiTableCell:{
          root:{
              paddingLeft:5,
              paddingRight:5,
              paddingTop:16,
              paddingBottom:16
          }
      }
    },
  });
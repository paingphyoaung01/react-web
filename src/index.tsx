import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './componets/App';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import {Colors} from './componets/res/color'
const theme = createMuiTheme({
    palette: {
      primary:{
        main: Colors.THEME_PRIMARY
      },
      secondary: {
          main: Colors.THEME_SECONDARY
      },
      info:{
        main:"#304FFE"
      }
    },
    overrides: {
      MuiTableCell: {
        root: {
          borderBottom: '1px solid '+Colors.DARK_GREY,
        },
      },
    },
  },
)

function App() {
  
  if(process.env.NODE_ENV == "production"){
    console.log = function(){}
    console.warn= function(){}
  }
  
    return (
      <MuiThemeProvider theme={theme}>
        <Root />
      </MuiThemeProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
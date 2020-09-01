import React from 'react';
import {MainPage} from "./view/MainPage";
import {Container} from "@material-ui/core";

function App()
{
  return (
      <React.Fragment>
          <Container className="container" maxWidth="md">
              <MainPage/>
          </Container>
      </React.Fragment>
  );
}

export default App;

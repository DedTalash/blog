import React from 'react';
import {MainPage} from "./view/MainPage";
import {Container} from "@material-ui/core";
import {connect, Provider} from "react-redux";
import store from "./redux/store";
import {setPostsService} from "./redux/actions";
import {PostsService} from "./components/PostsService";

type Props = {
    setPostsService(service: PostsService): void;
}

function App(props: Props)
{
   const service = new PostsService();
   props.setPostsService(service);

    return (
        <Provider store={store}>
            <React.Fragment>
                <Container className="container" maxWidth="md">
                    <MainPage/>
                </Container>
            </React.Fragment>
        </Provider>
    );
}

export default connect(
    null,
    {setPostsService}
)(App);

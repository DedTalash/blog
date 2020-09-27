import React from 'react';
import MainPage from "./view/MainPage";
import {Container} from "@material-ui/core";
import {connect} from "react-redux";
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
        <React.Fragment>
            <Container className="container" maxWidth="md">
                <MainPage/>
            </Container>
        </React.Fragment>
    );
}

export default connect(
    null,
    {setPostsService}
)(App);

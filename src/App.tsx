import React, {useEffect} from 'react';
import MainPage from "./view/MainPage";
import {Container} from "@material-ui/core";
import {connect, useDispatch} from "react-redux";
import {setPostsService, widthAction} from "./redux/actions";
import {PostsService} from "./components/PostsService";

type Props = {
    setPostsService(service: PostsService): void;
    // widthAction(innerWidth: number): void;
}

function App(props: Props)
{
    const service = new PostsService();
    props.setPostsService(service);
    // props.widthAction(window.innerWidth);

    const dispatch = useDispatch();
    useEffect(() => window.addEventListener('resize',
        () => dispatch(widthAction(window.innerWidth))), [dispatch])

    return (
        <React.Fragment>
            <Container className="container" maxWidth="md">
                <MainPage />
            </Container>
        </React.Fragment>
    );
}

export default connect(
    null,
    {setPostsService}
)(App);

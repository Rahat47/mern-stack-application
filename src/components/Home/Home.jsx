import React, { useState, useEffect } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { Grow, Grid, Container } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch, currentId]);

    const [snackOpen, setSnackOpen] = useState({
        open: false,
        severity: "",
        message: "",
    });
    return (
        <Grow in>
            <Container>
                <Grid
                    container
                    justify="space-between"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12} sm={7}>
                        <Posts
                            snackOpen={snackOpen}
                            setSnackOpen={setSnackOpen}
                            setCurrentId={setCurrentId}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form
                            snackOpen={snackOpen}
                            setSnackOpen={setSnackOpen}
                            setCurrentId={setCurrentId}
                            currentId={currentId}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;

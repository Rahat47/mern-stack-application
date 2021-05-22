import React, { useState, useEffect } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import {
    Grow,
    Grid,
    Container,
    Paper,
    AppBar,
    TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import Paginate from "../pagination";
import ChipInput from "material-ui-chip-input";
import { useHistory, useLocation } from "react-router";
import useStyles from "./styles";
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();

    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery");

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch, currentId]);

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid
                    container
                    justify="space-between"
                    alignItems="stretch"
                    spacing={3}
                    className={classes.gridContainer}
                >
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar
                            className={classes.appBarSearch}
                            position="static"
                            color="inherit"
                        >
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                fullWidth
                                value="test"
                                onChange={() => {}}
                            />
                        </AppBar>
                        <Form
                            setCurrentId={setCurrentId}
                            currentId={currentId}
                        />

                        <Paper elevation={6}>
                            <Paginate />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;

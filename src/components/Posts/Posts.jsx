import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";
import { CircularProgress, Grid } from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
    const posts = useSelector(state => {
        return state.posts;
    });

    const classes = useStyles();
    return !posts.length ? (
        <Grid container justify="center">
            <CircularProgress color="secondary" />
        </Grid>
    ) : (
        <Grid
            className={classes.mainContainer}
            container
            alignContent="stretch"
            spacing={3}
        >
            {posts.map(post => (
                <Grid item key={post._id} xs={12} sm={6}>
                    <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;

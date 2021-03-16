import React from "react";
import useStyles from "./styles";
import moment from "moment";
import {
    Card,
    CardActions,
    CardMedia,
    CardContent,
    Button,
    Typography,
} from "@material-ui/core";

import { ThumbUpAlt, Delete, MoreHoriz } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();

    const classes = useStyles();
    return (
        <Card raised className={classes.card}>
            <CardMedia
                className={classes.media}
                image={post.selectedFile}
                title={post.title}
            />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">
                    {moment(post.createdAt).fromNow()}
                </Typography>
            </div>
            <div className={classes.overlay2}>
                <Button
                    style={{ color: "white" }}
                    size="small"
                    onClick={() => {
                        setCurrentId(post._id);
                    }}
                >
                    <MoreHoriz fontSize="default" />
                </Button>
            </div>

            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">
                    {post.tags.map(tag => `#${tag} `)}
                </Typography>
            </div>

            <Typography className={classes.title} variant="h5" gutterBottom>
                {post.title}
            </Typography>

            <CardContent>
                <Typography variant="body2" component="p" color="textSecondary">
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button
                    color="primary"
                    onClick={() => dispatch(likePost(post._id))}
                    size="small"
                >
                    <ThumbUpAlt fontSize="small" /> &nbsp; Like &nbsp;{" "}
                    {post.likeCount}
                </Button>

                <Button
                    color="primary"
                    onClick={() => {
                        dispatch(deletePost(post._id));
                    }}
                    size="small"
                >
                    <Delete fontSize="small" /> Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default Post;

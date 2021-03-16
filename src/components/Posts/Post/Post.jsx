import React, { useState } from "react";
import useStyles from "./styles";
import moment from "moment";
import {
    Card,
    CardActions,
    CardMedia,
    CardContent,
    Button,
    Typography,
    Tooltip,
    Divider,
    Collapse,
    IconButton,
} from "@material-ui/core";
import clsx from "clsx";

import { ThumbUpAlt, Delete, MoreHoriz, ExpandMore } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card raised className={classes.card}>
            <CardMedia
                className={classes.media}
                image={
                    post.selectedFile ||
                    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                }
                title={post.title}
            />
            <div className={classes.overlay}>
                <Tooltip title="Creator of the post" placement="top">
                    <Typography variant="h6">{post.creator}</Typography>
                </Tooltip>
                <Typography variant="body2">
                    {moment(post.createdAt).fromNow()}
                </Typography>
            </div>
            <div className={classes.overlay2}>
                <Tooltip
                    title="Edit Post"
                    aria-label="Edit Post"
                    placement="top"
                >
                    <Button
                        style={{ color: "white" }}
                        size="small"
                        onClick={() => {
                            setCurrentId(post._id);
                        }}
                    >
                        <MoreHoriz fontSize="default" />
                    </Button>
                </Tooltip>
            </div>

            {post.tags[0] && (
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">
                        {post.tags.map(tag => (tag ? `#${tag} ` : ""))}
                    </Typography>
                </div>
            )}

            <Typography className={classes.title} variant="h5" gutterBottom>
                {post.title}
            </Typography>
            <Divider />

            <CardActions className={classes.cardActions}>
                <Tooltip title="Like Post">
                    <Button
                        color="primary"
                        onClick={() => dispatch(likePost(post._id))}
                        size="small"
                    >
                        <ThumbUpAlt fontSize="small" /> &nbsp; Like &nbsp;{" "}
                        {post.likeCount}
                    </Button>
                </Tooltip>

                <Tooltip title="Delete The Post" placement="top">
                    <Button
                        color="secondary"
                        onClick={() => {
                            dispatch(deletePost(post._id));
                        }}
                        size="small"
                    >
                        <Delete fontSize="small" /> Delete
                    </Button>
                </Tooltip>
                <Tooltip title="Show Details">
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMore />
                    </IconButton>
                </Tooltip>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography
                        variant="body2"
                        component="p"
                        color="textSecondary"
                    >
                        {post.message}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default Post;

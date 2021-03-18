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
    Snackbar,
    IconButton,
} from "@material-ui/core";
import clsx from "clsx";
import MuiAlert from "@material-ui/lab/Alert";

import {
    ThumbUpAlt,
    ThumbUpAltOutlined,
    Delete,
    MoreHoriz,
    ExpandMore,
} from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId, setSnackOpen, snackOpen }) => {
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem("profile"));
    const [expanded, setExpanded] = useState(false);

    const classes = useStyles();

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find(
                like => like === (user?.result?.googleId || user?.result?._id)
            ) ? (
                <>
                    <ThumbUpAlt fontSize="small" />
                    &nbsp;
                    {post.likes.length > 2
                        ? `You and ${post.likes.length - 1} others`
                        : `${post.likes.length} like${
                              post.likes.length > 1 ? "s" : ""
                          }`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlined fontSize="small" />
                    &nbsp;{post.likes.length}{" "}
                    {post.likes.length === 1 ? "Like" : "Likes"}
                </>
            );
        }

        return (
            <>
                <ThumbUpAltOutlined fontSize="small" />
                &nbsp;Like
            </>
        );
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackOpen({
            open: false,
        });
    };

    return (
        <Card raised className={classes.card}>
            <Snackbar
                open={snackOpen.open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity={snackOpen.severity}>
                    {snackOpen.message}
                </Alert>
            </Snackbar>
            <CardMedia
                className={classes.media}
                image={
                    post.selectedFile ||
                    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                }
                title={post.title}
            />
            <CardContent>
                <div className={classes.overlay}>
                    <Tooltip
                        title={
                            post?.name
                                ? "Creator Of the Post "
                                : "Posted Before Authentication Applied"
                        }
                        placement="top"
                    >
                        <Typography variant="h6">
                            {post.name || "UnAuthenticated Users"}
                        </Typography>
                    </Tooltip>
                    <Typography variant="body2">
                        {moment(post.createdAt).fromNow()}
                    </Typography>
                </div>
                {(user?.result?.googleId === post?.creator ||
                    user?.result?._id === post?.creator) && (
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
                )}

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
            </CardContent>

            <CardActions className={classes.cardActions}>
                <Tooltip title="Like Post">
                    <Button
                        color="primary"
                        onClick={() => {
                            dispatch(likePost(post._id));
                        }}
                        size="small"
                        disabled={!user?.result}
                    >
                        <Likes />
                    </Button>
                </Tooltip>
                {(user?.result?.googleId === post?.creator ||
                    user?.result?._id === post?.creator) && (
                    <Tooltip title="Delete The Post" placement="top">
                        <Button
                            color="secondary"
                            onClick={() => {
                                setSnackOpen({
                                    open: true,
                                    severity: "warning",
                                    message: "Post Will be Deleted.!!!",
                                });
                                dispatch(deletePost(post._id));
                            }}
                            size="small"
                        >
                            <Delete fontSize="small" /> Delete
                        </Button>
                    </Tooltip>
                )}

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
            <Collapse in={expanded} timeout="auto">
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

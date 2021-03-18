import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import {
    TextField,
    Button,
    Typography,
    Paper,
    Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId, setSnackOpen, snackOpen }) => {
    const [postData, setPostData] = useState({
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
    });
    const post = useSelector(state =>
        currentId ? state.posts.find(p => p._id === currentId) : null
    );

    const dispatch = useDispatch();
    const classes = useStyles();

    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const handleSubmit = e => {
        e.preventDefault();
        if (!postData.title || !postData.message) {
            setSnackOpen({
                open: true,
                severity: "warning",
                message: "Creator, Title & Message is required.!!",
            });
            return;
        }
        if (currentId) {
            dispatch(
                updatePost(currentId, { ...postData, name: user?.result?.name })
            );
            setSnackOpen({
                open: true,
                severity: "info",
                message: "Post is being Edited",
            });
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
            setSnackOpen({
                open: true,
                severity: "info",
                message: "Post is being Created",
            });
        }

        clear();
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

    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: "",
            message: "",
            tags: "",
            selectedFile: "",
        });
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign-Up or Log-in to Create Memories, and Like
                    other's Memories
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper}>
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
            <form
                onSubmit={e => handleSubmit(e)}
                className={`${classes.root} ${classes.form}`}
                autoComplete="off"
                noValidate
                action=""
            >
                <Typography variant="h6">
                    {currentId ? "Editing" : "Creating"} a Memory
                </Typography>

                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={e =>
                        setPostData({ ...postData, title: e.target.value })
                    }
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={e =>
                        setPostData({ ...postData, message: e.target.value })
                    }
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags, comma seperated"
                    fullWidth
                    value={postData.tags}
                    onChange={e =>
                        setPostData({
                            ...postData,
                            tags: e.target.value.split(","),
                        })
                    }
                />
                <div className={classes.fileInput}>
                    <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                            setPostData({ ...postData, selectedFile: base64 })
                        }
                    />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => {
                        setSnackOpen({
                            open: true,
                            severity: "success",
                            message: "Form Cleared!!",
                        });
                        clear();
                    }}
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;

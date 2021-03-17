import React, { useState } from "react";
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import useStyles from "./styles";
import { LockOutlined } from "@material-ui/icons";
import Input from "./Input";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const Auth = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [isSignUp, setIsSignUp] = useState(true);
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState(initialState);

    //!FUNCTIONS
    const handleSubmit = e => {
        e.preventDefault();
        console.log(formData);
    };

    const switchMode = () => {
        setIsSignUp(prevSwitchMode => !prevSwitchMode);
        setShowPassword(false);
    };

    const handleShowPassword = () =>
        setShowPassword(prevShowPassword => !prevShowPassword);

    const handleChange = () => {};

    const googleSuccess = async res => {
        console.log(res);
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: "AUTH", data: { result, token } });
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    };
    const googleFailure = () => {
        console.log("Google Sign In Was Unsuccesful. Try Again Later");
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>

                <Typography variant="h5">
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Typography>
                <form className={classes.form} onSubmit={e => handleSubmit(e)}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input
                                    name="firstName"
                                    label="First Name"
                                    handleChange={handleChange}
                                    half
                                    autoFocus
                                />
                                <Input
                                    name="lastName"
                                    label="Last Name"
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )}
                        <Input
                            type="email"
                            handleChange={handleChange}
                            name="email"
                            label="Email Address"
                        />
                        <Input
                            type={showPassword ? "text" : "password"}
                            handleChange={handleChange}
                            name="password"
                            label="Password"
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignUp && (
                            <Input
                                name="confirmPassword"
                                label="Repeat Password"
                                handleChange={handleChange}
                                type="password"
                            />
                        )}
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId="211521709225-qurapn0a2rl6fcf3ordp6ler2ofkc86j.apps.googleusercontent.com"
                        render={renderProps => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp
                                    ? "Already Have an Account? Sign In"
                                    : "Don't have an Account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;

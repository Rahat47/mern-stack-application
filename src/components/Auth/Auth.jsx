import React, { useState } from "react";
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
} from "@material-ui/core";
import useStyles from "./styles";
import { LockOutlined } from "@material-ui/icons";
import Input from "./Input";

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {};
    const switchMode = () => {
        setIsSignUp(prevSwitchMode => !prevSwitchMode);
        setShowPassword(false);
    };
    const handleShowPassword = () =>
        setShowPassword(prevShowPassword => !prevShowPassword);

    const handleChange = () => {};

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>

                <Typography variant="h5">
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
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

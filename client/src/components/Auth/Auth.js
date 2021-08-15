import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { signup, signin } from '../../actions/auth';
import Icon from './icon';
import Input from './Input';
import useStyles from './styles';

const initialState = { firstName: '', lastName: '', email : '', password: '', confirmPassword: ''};

function Auth() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState);
    const state = null;
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();

    function handleShowPassword(){setShowPassword(prevShowPassword => !prevShowPassword)}

    function switchMode(){setIsSignup(prevSignup => !prevSignup); setShowPassword(false);}

    function handleSubmit(e) {
        e.preventDefault();
        
        if(isSignup){
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }

    function handleChange(e) {setFormData({ ...formData, [e.target.name]: e.target.value })}

    async function googleSuccess (res){
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    function googleFailure() {
        console.log('Google Sign In was unsuccessful. Try Again Later')
    }

    return (
        <div>
            <Container component='main' maxWidth='xs'>
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                               isSignup && (
                                <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half /> 
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half /> 
                                </>
                               )
                            }
                            <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                            <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                            { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' /> }
                        </Grid>
                            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}> {isSignup ? 'Sign Up' : 'Sign In'} 
                            </Button>
                            <GoogleLogin 
                                clientId='317368276235-r19th7qo2ke62qj8vcuj3mhgv5ci68qv.apps.googleusercontent.com'
                                render={(renderProps) => (
                                 <Button className={classes.googleButton}  color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} tartIcon={<Icon />} variant='contained'> Google Sign In </Button> 
                                )}
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy='single_host_origin'
                            />
                            <Grid container justify='flex-end'>
                                <Button onClick={switchMode} color={isSignup ? 'secondary' : 'primary'}>
                                    { isSignup ? "Already have an account? Go Sign in" :  "Don't have and account? Go Sign Up"}
                                </Button>
                            </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    );
}

export default Auth;
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@material-ui/core';
import { Link, useHistory, useLocation } from "react-router-dom";
import useStyles from './styles'; 
import { useDispatch } from 'react-redux';
import memories from '../../images/memories.png';
import decode from 'jwt-decode';

import * as actionType from '../../constants/actionTypes';

function Navbar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);

    const location = useLocation();
    const history = useHistory(); 
    const classes = useStyles();
    const dispatch = useDispatch();

    function logout(){
        dispatch({ type: 'LOGOUT' });

        history.push('/');

        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        // JWT
        if (token) {
            const decodedToken = decode(token);
      
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
          }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);


    return (
            <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </div>
            <Toolbar classNamep={classes.toolbar}>
            {user?.result ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                    <Button className={classes.logout} variant='contained' color='secondary' onClick={logout}>Logout</Button>
                </div>
            ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
            )}
            </Toolbar>
            </AppBar> 
    );
}

export default Navbar;
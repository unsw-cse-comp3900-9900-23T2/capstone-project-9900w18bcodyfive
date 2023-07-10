import React from 'react';
import styled from '@emotion/styled';
import logo from '../assets/logo/Kellner-Logo.png';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

//Redux Imports
import { useSelector ,useDispatch } from 'react-redux';
import { loggedOut } from '../redux/slices/managerSlice';

const MasterContainer = styled('div')(({scrollProp}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    background: scrollProp ? "white" : "none"
}));

const Container = styled('div')({
    margin: 0,
    padding: '1rem',
    display: 'flex',
    maxHeight: '10vh',
    background: 'none',
});

const LogoContainer = styled('img')({
    height: '8vh',
    width: '10vw',
    objectFit: 'contain',
});

const NameContainer = styled('div')({
    margin: 0,
    padding: '1rem 0rem',
    fontWeight: 'bolder',
    fontSize: '3rem',
    "&:hover": {
        cursor: 'pointer',
        transform: 'scale(1.2)'
    }
});

const ButtonContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    minWidth: '20vw',
    justifyContent: 'center',
    marginRight: '5rem'
});

const HeaderTags = styled('div')(({scrollProp}) =>({
    padding: '3rem',
    fontFamily: 'Nunito',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: scrollProp ? 'black' :'white',
    "&:hover" : {
        textDecoration: 'underline white',
        transform: 'scale(1.2)',
        cursor: 'pointer'
    }
}));

const StyledHeader = styled('header')({
    top: '0',
    left: '0',
    width: '100%',
    zIndex: '999',
    position: 'fixed'
})

const Header = ()=>{
    const [scrollChange, setScrollChanage] = React.useState(false);
    const mName = useSelector(state => state.manager.mName)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
   window.addEventListener('scroll', ()=>{
    if(window.scrollY >= 1000){
        setScrollChanage(true);
    } else {
        setScrollChanage(false);
    }
   });
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const lo = ()=>{
        dispatch(loggedOut())
        navigate('/');
    }
    return(
        <StyledHeader>
            <MasterContainer scrollProp={scrollChange}>
                <Container>
                    <LogoContainer src={logo}/>
                    <NameContainer><span style={{color:'#006600'}}>Kell</span>ner</NameContainer>
                </Container>
                <ButtonContainer>
                    <HeaderTags scrollProp={scrollChange}>
                        Home
                    </HeaderTags>
                    <HeaderTags scrollProp={scrollChange}>
                        My Restaurant
                    </HeaderTags>
                    {/* <Button variant="contained" color='success' size='large' onClick={lo}>Log Out</Button> */}
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar src="/broken-image.jpg" sx={{ width: 50, height: 50, bgcolor: 'white', color: '#006600' }}/>
                        <HeaderTags scrollProp={scrollChange} style={{padding: '1rem'}}>{mName}</HeaderTags>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            },
                            '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            },
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose}>
                            <Avatar /> Profile
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Avatar /> My account
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Add another account
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </ButtonContainer>
            </MasterContainer>
        </StyledHeader>
    );
}

export default Header;
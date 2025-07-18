import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Badge, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import logo from '../assets/deepscribe-logo.png';

const Header: React.FC = () => {
  const location = useLocation();

  // Count saved trials in localStorage
  const savedCount = JSON.parse(localStorage.getItem('savedTrials') || '[]').length;

  return (
    <AppBar
        position="static"
        color="default"
        elevation={2}
        sx={{
        bgcolor: '#ffffff',
        }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        
        {/* Left: Logo and Name */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            component={Link}
            to="/"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ mr: 1 }}
          >
            <img src={logo} alt="DeepScribe" style={{ height: 36 }} />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            color="primary"
            sx={{
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Clinical Trial Matcher
          </Typography>
        </Box>

        {/* Right: Navigation */}
        <Box>
          {location.pathname !== '/' && (
            <Button color="primary" component={Link} to="/">
              Home
            </Button>
          )}

          <Button color="primary" component={Link} to="/saved" startIcon={
            <Badge badgeContent={savedCount} color="secondary">
              <BookmarkIcon />
            </Badge>
          }>
            Saved Trials
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

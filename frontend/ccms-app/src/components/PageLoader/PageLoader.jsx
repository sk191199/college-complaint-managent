import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from "@mui/material/CircularProgress";

const PageLoader = () => {
  return (
    <Box sx={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <CircularProgress/>
    </Box>
  )
}

export default PageLoader

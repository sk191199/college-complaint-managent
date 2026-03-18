import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { getAllComplaints } from '../../api/auth.api'
import { useEffect } from 'react'

const Complaints = () => {
  // fetched complaints
  const fetchComplaints = async () => {
    try {
      const response = await getAllComplaints();
      console.log("complaints", response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchComplaints()
  }, [])
  return (
    <Box display="" mx="" my="" sx="">
      <Typography variant="h5" color="initial">Complaints</Typography>
    </Box>
  )
}

export default Complaints

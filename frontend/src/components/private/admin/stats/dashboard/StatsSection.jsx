import React from 'react'
import { Grid, Paper, Typography, Box } from '@mui/material'

export const StatsSection = ({ title, children, summary, xs = 12, md = 6 }) => {
  return (
    <Grid item xs={xs} md={md}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {summary && (
          <Typography variant="body1" gutterBottom>
            {summary}
          </Typography>
        )}
        <Box mt={2}>{children}</Box>
      </Paper>
    </Grid>
  )
}

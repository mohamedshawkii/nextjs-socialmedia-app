import { Box, LinearProgress } from "@mui/material";

const SideBarLoader = () => {
  return (
    <Box component={'aside'}
      sx={{
        width: '16.75rem',
        height: '100%',
        borderWidth: '1px',
        borderColor: '#2F3336',
        padding: '1rem'
      }}
    >
      <LinearProgress sx={{
        backgroundColor: '#D9D9D9', height: '2px',
        '& .MuiLinearProgress-barColorPrimary': { backgroundColor: "#1D9BF0" },
      }} />
    </Box>
  );
}

export default SideBarLoader;
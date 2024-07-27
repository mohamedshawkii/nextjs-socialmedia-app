import { SignIn } from "@clerk/nextjs";
import Box from '@mui/material/Box';

export default function Page() {
  return (
    <Box 
    component="section"
    className="flex items-center justify-center h-svh bg-bgMain">

      <SignIn />
    </Box>
  )
}

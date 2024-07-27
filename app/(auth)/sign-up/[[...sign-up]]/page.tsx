import { SignUp } from "@clerk/nextjs";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <Box className="flex items-center justify-center h-auto bg-bgMain">
      <Box component="section" className="p-16">
        <SignUp />
      </Box>
    </Box>
  )
}

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface FooterProps {
  name?: string;
}

export default function Footer({ name }: FooterProps) {
  return (
    <Box component="footer" sx={{ bgcolor: "#fff", borderTop: "1px solid #e7edf4", py: 4, mt: "auto" }}>
      <Container maxWidth="md">
        <Stack spacing={3} alignItems="center">
          <Typography color="#000000" fontSize="1rem" fontWeight={400} textAlign="center">
            © 2024 {name || "Ashish Negi"}. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook} from "@mui/icons-material";
import GoogleIcon from '@mui/icons-material/Google';
import { Box } from "@mui/material";

export default function Footer() {
    return (
      <Box
        component="footer"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
          p: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Bài Viết
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Chúng tôi làm trang web Sử Việt này để giúp mọi người có thể hiểu rõ hơn về lịch sử Việt Nam của chúng ta.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Liên Hệ
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nhà Văn Hóa Sinh Viên, Dĩ An, Bình Dương
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: suviet2204@gmail.com
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: +1 234 567 8901
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Theo Dõi
              </Typography>
              <Link href="https://www.facebook.com/" color="inherit" style={{marginLeft:'20px'}}>
                <Facebook />
              </Link>
              <Link href="mailto:suviet2204@gmail.com" color="inherit">
                <GoogleIcon />
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Typography variant="body2" color="text.secondary" align="center">
              {"Copyright © "}
              {/* <Link color="inherit" href="https://your-website.com/">
                Your Website
              </Link>{" "} */}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

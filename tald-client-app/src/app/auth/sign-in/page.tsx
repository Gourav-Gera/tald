"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signIn } from "next-auth/react";
import styles from "../auth.module.scss";
import Image from 'next/image';
import headerLogo from "../../../assets/images/header-logo.png"
import RootLayout from "@/app/layout";


export default function Page() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    try {
      const result = await signIn("credentials", {
        email: data.get("email"),
        password: data.get("password"),
        redirect: true,
        callbackUrl: "/",
      });
      console.log({ result });
    } catch (error) {
      console.log(error);
    }
  };

	return (
    <div className={styles.signInWrapper}>
		<Box className={styles.signInHeader} sx={{ flexGrow: 1 }}>
			<Container maxWidth="xl">
				<Typography variant="h6" color="inherit" component="div">
					<Image
						src={headerLogo}
						width={84}
						height={35}
						className={styles.logoImage}
						alt="logo image"
					/>
				</Typography>
			</Container>
		</Box>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Welcome Back
          </Typography>
          <Box
				component="form"
				className="w-100"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              variant="standard"
              label="Email Address"
              name="email"
              autoComplete="off"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
            />
            <Grid container className={styles.forgotPasswordWrap}>
					{/* <Grid item xs={6}>
						<FormControlLabel
							control={<Checkbox value="remember" color="secondary" />}
							label="Remember me" />
					</Grid>   */}
					<Grid item xs={12} className="text-align-right">
						<Link href="#" variant="body2">
							Forgot password?
						</Link>
					</Grid>
            </Grid>
           
            <Button
              	type="submit"
					fullWidth
					className="primaryOutline"
              	variant="contained"
              	sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container className="text-align-center">
              <Grid className="w-100" item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

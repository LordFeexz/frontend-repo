import Container from "@/components/Container";
import { Box, Typography } from "@/components/ui/Mui";
import LoginForm from "./components/form";
import { getServerSideSession } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function Page() {
  if (await getServerSideSession()) redirect("/");

  return (
    <Container
      as="main"
      className="flex flex-col justify-center h-full w-full no-scrollbar scroll-smooth transition-all duration-300 mx:auto"
      data-aos="fade-down"
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h2" variant="h5">
          Sign in
        </Typography>
        <LoginForm />
      </Box>
    </Container>
  );
}

export const dynamic = "force-static";

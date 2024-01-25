import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField } from "@mui/material";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        www.bestidahopizza.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Home(props: { app: any }) {
  const [prompt, setPrompt] = React.useState("");
  const [fetching, setFetching] = React.useState(false);
  const [conversation, setConversation] = React.useState([
    {
      speaker: "doc",
      dialog:
        "Just text me your order and I'll be happy to get it started for you.",
    },
  ]);

  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    console.log(messagesEndRef);
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const testAPI =
      "http://127.0.0.1:5001/docs-pizza/us-central1/chatCompletion";
    const prodAPI =
      "https://us-central1-docs-pizza.cloudfunctions.net/chatCompletion";
    try {
      // setConversation([...conversation, ]);

      const data = {
        prompt,
      };

      setFetching(true);
      console.log(data);
      const result = await axios.post(testAPI, { data });
      console.log(result);

      const output = (result.data.result as any).aiResponse;
      setConversation([
        ...conversation,
        { speaker: "user", dialog: prompt },
        { speaker: "doc", dialog: output },
      ]);
      setPrompt("");
    } catch (error: any) {
      console.log(error.code);
      console.log(error.message);
      console.log(error.details);
    } finally {
      setFetching(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Docs Pizza
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Docs Pizza
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Doc's pizza is hand's down the best Pizza Restaurant in Idaho.
              With new ownership, comes a bright new day. We've got great food,
              great hours and we're excited to serve you!
            </Typography>
            <Stack
              sx={{ pt: 4, alignItems: "center" }}
              direction="column"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="outlined">Call Now to Order</Button>
              <Typography>Or</Typography>
              <Typography variant="h6">
                Place an order through our Ai Assistant, Doc!
              </Typography>
            </Stack>
          </Container>
        </Box>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              height: 400,
              marginBottom: 3,
              maxWidth: 350,
              display: "flex",
              flexBasis: "column",
              flexDirection: "column",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexBasis: "column",
                flexDirection: "column",
                overflow: "scroll",
                overflowY: "auto",
              }}
            >
              {conversation.map((dialog) => {
                const isDoc = dialog.speaker === "doc";

                return (
                  <Typography
                    sx={{
                      margin: 2,
                      backgroundColor: isDoc ? "red" : "black",
                      color: "white",
                      padding: "10px",
                      borderRadius: "10px",
                      display: "inline",
                      marginBottom: "5px",
                      inlineSize: "fit-content",
                      alignSelf: isDoc ? "flex-start" : "flex-end",
                    }}
                  >
                    {isDoc ? "Doc" : "User"}: {dialog.dialog}
                  </Typography>
                );
              })}
              <div ref={messagesEndRef} />
            </CardContent>
          </Card>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              variant="outlined"
              label="Enter order here"
              maxRows={10}
              sx={{ width: 350, marginBottom: 3 }}
            />

            <Button
              type="submit"
              disabled={fetching}
              variant="contained"
              sx={{ width: "300px", marginBottom: 6 }}
            >
              {fetching ? "Processing" : "Submit"}
            </Button>
          </form>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

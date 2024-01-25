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
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const menu1 = () => {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  // 16:9
                  pt: "56.25%",
                }}
                image="https://source.unsplash.com/random?wallpapers"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Heading
                </Typography>
                <Typography>
                  This is a media card. You can use this section to describe the
                  content.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const MediaCard = (props: {
  heading: string;
  description: string;
  cta: string;
  image: string;
}) => {
  return (
    <Card
      sx={{
        // height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="div"
        sx={{
          // 16:9
          // height: "100%",
          pt: "56.25%",
        }}
        image={props.image}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {props.heading}
        </Typography>
        <Typography>{props.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{props.cta}</Button>
      </CardActions>
    </Card>
  );
};

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Home(props: { app: any }) {
  const [prompt, setPrompt] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [fetching, setFetching] = React.useState(false);
  const [conversation, setConversation] = React.useState([
    {
      speaker: "doc",
      dialog:
        "Just text me your order and I'll be happy to get it started for you.",
    },
  ]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const testAPI =
      "http://127.0.0.1:5001/docs-pizza/us-central1/chatCompletion";
    const prodAPI =
      "https://us-central1-docs-pizza.cloudfunctions.net/chatCompletion";
    try {
      let newConvo = conversation;
      newConvo.push({ speaker: "user", dialog: prompt });
      setConversation(newConvo);

      const data = {
        prompt,
      };

      setFetching(true);
      console.log(data);
      const result = await axios.post(prodAPI, { data });
      console.log(result);
      setPrompt("");
      const output = (result.data.result as any).aiResponse;
      setOutput(output);
      let nextConvo = conversation;
      nextConvo.push({ speaker: "doc", dialog: output });
      setConversation(nextConvo);
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
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Place an Order Online</Button>
              <Button variant="outlined">Call Now to Order</Button>
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
              }}
            >
              {conversation.map((dialog) => {
                if (dialog.speaker === "doc") {
                  return (
                    <Typography sx={{ textAlign: "left", margin: 2 }}>
                      Doc: {dialog.dialog}
                    </Typography>
                  );
                } else {
                  return (
                    <Typography
                      sx={{ textAlign: "right", marginLeft: 50, margin: 2 }}
                    >
                      User: {dialog.dialog}
                    </Typography>
                  );
                }
              })}
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
              multiline
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
          <Typography>Order Summary</Typography>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          The end of the page
        </Typography>
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

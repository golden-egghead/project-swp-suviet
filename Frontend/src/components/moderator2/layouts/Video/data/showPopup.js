import React from "react";
import {
  Dialog,
  DialogContent,
  Container,
  IconButton,
  styled,
  Typography,
  DialogTitle,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "90%",
    maxWidth: "752px",
  },
  "& .MuiDialogTitle-root": {
    padding: "16px",
  },
  "& .MuiDialogContent-root": {
    padding: "16px",
  },
  "& .MuiDialogActions-root": {
    padding: "8px",
  },
  "& .closeButton": {
    position: "absolute",
    top: "8px",
    right: "8px",
    zIndex: "1",
    backgroundColor: theme.palette.background.default,
    borderRadius: "50%",
    padding: "4px",
  },
  "& .closeButton:hover": {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ModalCase({ setOpen, url }) {
    const handleClose = () => {
      setOpen(false);
    };
  
    // Function to extract the YouTube video ID from the URL
    const extractVideoId = (url) => {
      const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch(?:\/|\?v=)|embed\/|v\/))([^?&]+)/i);
      return match ? match[1] : null;
    };
  
    const videoId = extractVideoId(url); // Extract the video ID from the URL
  
    return (
      <Container>
        <StyledDialog open={true} onClose={handleClose}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            className="closeButton"
            aria-label="close"
          >
            <CloseOutlined />
          </IconButton>
          <DialogContent>
            {videoId && (
              <iframe
                width="100%"
                height="400px"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            {!videoId && (
              <Typography variant="body1">
                Invalid YouTube video URL.
              </Typography>
            )}
          </DialogContent>
        </StyledDialog>
      </Container>
    );
  }
  
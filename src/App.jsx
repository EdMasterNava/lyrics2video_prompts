import React, { useState } from 'react';
import { 
  Typography,
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button
} from '@mui/material';
import axios from 'axios';
import './App.css'

function App() {
  const [payload, setPayload] = useState(null);
  const [lyrics, setLyrics] = useState('');
  const [error, setError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setPayload(null);
    setLyrics('');
  }
  const handleGenerate = async() => {
    if(lyrics === '') {
      setError(true);
      return
    }
    setIsLoading(true)
    const response = await axios.post('https://jup5yqkhzv6qco67gvzysyd7fq0eiyiw.lambda-url.us-west-1.on.aws/', {lyrics});
    const data = response["data"];
    if ('content_filter' === data["finish_reason"]){
      setContentError(true);
      setIsLoading(false)
      return
    }
    if ('length' === data["finish_reason"]){
      setContentError(true);
      setIsLoading(false)
      return
    }
    setPayload(JSON.parse(data["lyrics_string_json"]));
    setIsLoading(false)
  }
  const handleDialogClose = () => {
    setContentError(false)
  }
  return (
    <>
      <Typography 
        variant='h1' 
        color='whitesmoke' 
        align='center'
        sx={{
          my: '15px'
        }}
      >
        Lyrics to Video Prompts
      </Typography>
      {!payload &&
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Box 
            sx={{
              width: '1000px',
              backgroundColor: '#d3d3d3',
              borderRadius: '5px',
              mb: '20px'
            }}
          >
            <TextField 
              variant='outlined' 
              fullWidth 
              multiline 
              rows={28}
              placeholder='Enter Lyrics Here 🎶'
              value={lyrics}
              onChange={(e) => setLyrics(e.currentTarget.value)}
              error={error}
            />
          </Box>
          <Typography 
            variant='h2' 
            color='whitesmoke' 
            align='center'
            onClick={isLoading ? () => {} : handleGenerate}
            sx={{
              backgroundColor: '#0067c1',
              borderRadius: '5px',
              width: '1000px',
              py: '5px',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#005bab'
              }
            }}
          >
            {isLoading ? 'Loading...' : 'Generate'}
          </Typography>  
        </div>
      }
      {payload && 
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              width: '1000px',
            }}
          >
            <Typography 
              variant='h5'
              onClick={handleReset}
              color='whitesmoke' 
              sx={{
                backgroundColor: '#0067c1',
                width: '100px',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: '5px',
                cursor: 'pointer',
                mb: '10px',
                '&:hover': {
                  backgroundColor: '#005bab'
                }
              }}
            >
              Reset
            </Typography>
          </div>
          <TableContainer 
            component={Paper}
            sx={{
              width: '1000px',
              backgroundColor: '#d3d3d3'
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Lyric Section</TableCell>
                  <TableCell >Prompt</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payload.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      {row["lyrics"]}
                    </TableCell>
                    <TableCell>
                      {row["story"]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>  
        </div>
      }
      <Dialog
        open={contentError}
        onClose={handleDialogClose}
      >
        <DialogTitle
          sx={{
            backgroundColor: '#e3e3e3'
          }}
        >
          Open AI's Content Filter Activated
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: '#e3e3e3'
          }}
        >
          <DialogContentText 
            color='#303030'
            sx={{
              pt: '15px'
            }}
          >
            The lyrics entered violate Open AI's terms of service.
          </DialogContentText>
          <DialogContentText color='#303030'>
            Please modify or enter new lyrics. 
          </DialogContentText>
          <DialogContentText color='#303030'>
            Learn more 
              <a 
                href='https://platform.openai.com/docs/guides/moderation/overview' 
                target="_blank"
                style={{
                  textDecoration: 'none',
                  paddingLeft: '5px'
                }}
              >
                here
              </a>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: '#e3e3e3'
          }}
        >
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default App

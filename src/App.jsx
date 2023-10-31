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
  Paper
} from '@mui/material';
import axios from 'axios';
import './App.css'

function App() {
  const [payload, setPayload] = useState(null);
  const [lyrics, setLyrics] = useState('');

  const handleReset = () => {
    setPayload(null);
  }
  const handleGenerate = async() => {
    const response = await axios.post('https://jup5yqkhzv6qco67gvzysyd7fq0eiyiw.lambda-url.us-west-1.on.aws/', {lyrics});
    console.log(response)
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
            />  
          </Box>
          <Typography 
            variant='h2' 
            color='whitesmoke' 
            align='center'
            onClick={handleGenerate}
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
            Generate
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
              sx={{
                backgroundColor: '#cd9300',
                width: '100px',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: '5px',
                cursor: 'pointer',
                mb: '10px',
                '&:hover': {
                  backgroundColor: '#bb8600'
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
    </>
  )
}

export default App

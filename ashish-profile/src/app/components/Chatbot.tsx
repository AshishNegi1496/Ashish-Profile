'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box, TextField, Button, Typography, CircularProgress, Paper,
  Avatar, IconButton, Stack, Chip, Fade
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';

interface Message { sender: 'user' | 'bot'; text: string; }
interface ChatbotProps { isOpen: boolean; onClose: () => void; profileName: string; }

const CHAT_API_ENDPOINT = "http://10.208.10.157:8000/api/ai/chat";

const postChat = async (prompt: string) => {
  const res = await fetch(`${CHAT_API_ENDPOINT}?prompt=${encodeURIComponent(prompt)}`, { method: 'POST' });
  if (!res.ok) throw new Error((await res.json()).detail || res.statusText);
  return res.json();
};

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, profileName }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0)
      setMessages([{ sender: 'bot', text: `Hello! I'm ${profileName}'s AI Assistant. How can I help you learn more about Ashish today?` }]);
  }, [isOpen, messages.length, profileName]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const suggested = [
    `What are ${profileName}'s key skills?`,
    `Tell me about ${profileName}'s work experience.`,
    `What projects has ${profileName} worked on?`,
    `Does ${profileName} have any certifications?`
  ];

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { sender: 'user', text }]);
    setInput('');
    setLoading(true);
    try {
      const data = await postChat(text);
      setMessages(m => [...m, { sender: 'bot', text: data.reply || "I'm sorry, I couldn't generate a response." }]);
    } catch (e: any) {
      setMessages(m => [...m, { sender: 'bot', text: `Error: ${e.message}` }]);
    } finally { setLoading(false); }
  }, []);

  if (!isOpen) return null;

  return (
    <Fade in={isOpen}>
      <Paper elevation={10} sx={{
        position: 'fixed', bottom: 20, right: 20, width: { xs: '90%', sm: 350 },
        height: { xs: '70vh', sm: 500 }, display: 'flex', flexDirection: 'column',
        borderRadius: 3, overflow: 'hidden', zIndex: 1300, bgcolor: 'background.paper',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
      }}>
        {/* Header */}
        <Box sx={{
          p: 2, bgcolor: 'primary.main', color: 'primary.contrastText',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <SmartToyIcon sx={{ fontSize: 28 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {profileName}'s AI Assistant
          </Typography>
          <IconButton size="small" onClick={onClose} color="inherit"><CloseIcon /></IconButton>
        </Box>
        {/* Messages */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, bgcolor: '#f0f2f5' }}>
          {messages.map((msg, i) => (
            <Box key={i} sx={{
              display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', mb: 1.5
            }}>
              {msg.sender === 'bot' && (
                <Avatar sx={{ bgcolor: 'primary.light', mr: 1, width: 32, height: 32 }}>
                  <SmartToyIcon fontSize="small" />
                </Avatar>
              )}
              <Paper variant="outlined" sx={{
                p: 1.5, borderRadius: msg.sender === 'user' ? '20px 20px 0px 20px' : '20px 20px 20px 0px',
                bgcolor: msg.sender === 'user' ? '#e0f7fa' : '#fff', maxWidth: '75%', wordBreak: 'break-word', boxShadow: 1
              }}>
                <Typography variant="body2">{msg.text}</Typography>
              </Paper>
            </Box>
          ))}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1.5 }}>
              <Avatar sx={{ bgcolor: 'primary.light', mr: 1, width: 32, height: 32 }}>
                <SmartToyIcon fontSize="small" />
              </Avatar>
              <Paper variant="outlined" sx={{
                p: 1.5, borderRadius: '20px 20px 20px 0px', bgcolor: '#fff', maxWidth: '75%', boxShadow: 1
              }}>
                <CircularProgress size={20} />
              </Paper>
            </Box>
          )}
          <div ref={endRef} />
        </Box>
        {/* Suggestions */}
        {!loading && messages.length > 1 && (
          <Stack direction="row" spacing={1} sx={{ p: 1, overflowX: 'auto', bgcolor: '#f0f2f5', borderTop: '1px solid #eee' }}>
            {suggested.map((q, i) => (
              <Chip key={i} label={q} onClick={() => sendMessage(q)} color="info" variant="outlined" size="small"
                sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'info.light' } }} />
            ))}
          </Stack>
        )}
        {/* Input */}
        <Box sx={{ p: 2, borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', bgcolor: 'background.paper' }}>
          <TextField
            fullWidth variant="outlined" size="small" placeholder="Type your message..."
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !loading) sendMessage(input); }}
            disabled={loading} sx={{ mr: 1, '& .MuiOutlinedInput-root': { borderRadius: '25px' } }}
          />
          <Button variant="contained" color="primary" onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()} sx={{ borderRadius: '25px', minWidth: 40, height: 40, p: 0 }}>
            <SendIcon />
          </Button>
        </Box>
      </Paper>
    </Fade>
  );
};

export default Chatbot;
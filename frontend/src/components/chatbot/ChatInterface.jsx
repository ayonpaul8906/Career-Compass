import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';
import { SendHorizonal, Bot, User, Upload, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Skeleton } from '../ui/skeleton';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { db, auth } from '../../lib/firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const API_URL = 'https://career-compass-gdg.onrender.com/chat';
const CLEAR_URL = 'https://career-compass-gdg.onrender.com/clear';

function FilePreview({ file }) {
  if (!file) return null;
  const isImage = file.type.startsWith('image/');
  if (isImage) {
    const url = URL.createObjectURL(file);
    return (
      <div className="mb-2 flex items-center gap-2">
        <img src={url} alt={file.name} className="max-h-24 rounded shadow border" onLoad={() => URL.revokeObjectURL(url)} />
        <span className="text-xs text-white bg-blue-600 px-2 py-1 rounded">{file.name}</span>
      </div>
    );
  }
  // For PDF/DOC/DOCX
  return (
    <div className="mb-2 flex items-center gap-2">
      <FileText className="text-blue-600" />
      <span className="text-xs text-white bg-blue-600 px-2 py-1 rounded">{file.name}</span>
    </div>
  );
}

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pendingFile, setPendingFile] = useState(null); 
  const [userId, setUserId] = useState(null);
  const scrollAreaRef = useRef(null);

  // Get current user ID from Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
    return () => unsubscribe();
  }, []);

  // Load messages from Firestore on mount (when userId is ready)
  useEffect(() => {
    if (!userId) return;
    const fetchMessages = async () => {
      const docRef = doc(db, "conversations", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMessages(docSnap.data().messages || []);
      } else {
        setMessages([]);
      }
    };
    fetchMessages();
  }, [userId]);

  // Save messages to Firestore whenever they change
  useEffect(() => {
    if (!userId) return;
    const saveMessages = async () => {
      const docRef = doc(db, "conversations", userId);
      await setDoc(docRef, { messages });
    };
    if (messages.length > 0) saveMessages();
  }, [messages, userId]);

  // Always scroll to the bottom after new message
  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages, isLoading, isClearing]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setPendingFile(e.target.files[0]);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedFile) || isLoading || !userId) return;

    setIsLoading(true);

    try {
      let res, data;
      if (selectedFile) {
        // Send file and optional message as FormData
        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('file', selectedFile);
        if (input.trim()) formData.append('message', input.trim());

        // Show file preview above message
        const isImage = selectedFile.type.startsWith('image/');
        const fileMsg = {
          role: 'user',
          content: input.trim() ? input.trim() : '',
          file: {
            name: selectedFile.name,
            type: selectedFile.type,
            url: isImage ? URL.createObjectURL(selectedFile) : null,
          }
        };
        setMessages((prev) => [...prev, fileMsg]);
        setInput('');
        setSelectedFile(null);
        setPendingFile(null);

        res = await fetch(API_URL, {
          method: 'POST',
          body: formData,
        });
      } else {
        // Normal text message
        const userMessage = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId, message: input }),
        });
      }

      data = await res.json();

      if (res.ok && data.response) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.error || 'Sorry, something went wrong.' }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = async () => {
    setIsClearing(true);
    try {
      await fetch(CLEAR_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId }),
      });
      setMessages([]);
      // Also clear in Firestore
      const docRef = doc(db, "conversations", userId);
      await setDoc(docRef, { messages: [] });
      // Simulate loading for a moment
      await new Promise(res => setTimeout(res, 800));
    } catch (error) {
      console.error('Clear error:', error);
    } finally {
      setIsClearing(false);
    }
  };

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-full text-lg text-gray-500">
        Loading user...
      </div>
    );
  }

  return (
    <Card
      className="h-full w-full flex flex-col bg-white/30 dark:bg-white/5 backdrop-blur-lg border border-blue-200/30 dark:border-blue-800/30 rounded-2xl shadow-xl transition-all"
      style={{ height: 'calc(100vh - 12rem)' }}
    >
      <CardContent className="p-4 flex-grow flex flex-col overflow-hidden relative">
        {isClearing && (
          <div className="absolute inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50">
            <div className="text-white text-lg font-semibold flex items-center gap-2">
              <span className="animate-spin inline-block w-5 h-5 border-2 border-t-transparent border-white rounded-full"></span>
              Clearing...
            </div>
          </div>
        )}
        <ScrollArea className="flex-grow mb-4 pr-4 overflow-y-auto" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'flex items-start gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <Avatar className="w-8 h-8 border">
                    <AvatarFallback><Bot className="w-5 h-5 text-blue-600" /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'rounded-xl px-4 py-3 max-w-sm md:max-w-md text-sm shadow-md',
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-700 text-white border border-blue-200 dark:border-blue-700'
                  )}
                  style={{ color: 'white' }}
                >
                  {/* Show file/image preview above user message */}
                  {message.file && (
                    message.file.url ? (
                      <img src={message.file.url} alt={message.file.name} className="max-h-24 rounded mb-2" />
                    ) : (
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="text-white" />
                        <span className="text-xs">{message.file.name}</span>
                      </div>
                    )
                  )}
                  {message.role === 'assistant' ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        strong: ({ node, ...props }) => <strong className="text-yellow-200 font-semibold" {...props} />,
                        li: ({ node, ...props }) => <li className="ml-4 list-disc" {...props} />,
                        p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </div>
                {message.role === 'user' && (
                  <Avatar className="w-8 h-8 border">
                    <AvatarFallback><User className="w-5 h-5 text-white" /></AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <Avatar className="w-8 h-8 border">
                  <AvatarFallback><Bot className="w-5 h-5 text-blue-600" /></AvatarFallback>
                </Avatar>
                <div className="rounded-xl px-4 py-3 bg-blue-700 text-white border border-blue-200 dark:border-blue-700 shadow-md">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex flex-col gap-2 mt-auto">
          {/* File/image preview above input */}
          {pendingFile && (
            <FilePreview file={pendingFile} />
          )}
          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message or upload a file..."
              disabled={isLoading || isClearing}
              className="flex-grow border-blue-300  focus:border-blue-500 transition-all"
              style={{ color: 'white' }}
            />
            <input
              type="file"
              accept=".pdf,.doc,.docx,image/*"
              onChange={handleFileChange}
              disabled={isLoading || isClearing}
              style={{ display: 'none' }}
              id="file-upload"
            />
            <Button
              variant="outline"
              disabled={isLoading || isClearing}
              onClick={() => document.getElementById('file-upload').click()}
              className='border-blue-300 hover:cursor-pointer transition-all'
            >
              <Upload className="h-5 w-5 text-white" />
            </Button>
            <Button onClick={handleSend} disabled={isLoading || isClearing || (!input.trim() && !selectedFile)} className="bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all">
              <SendHorizonal className="h-5 w-5" />
            </Button>
            <Button variant="outline" className='text-red-500 border-blue-300 hover:cursor-pointer' onClick={handleClear} disabled={isLoading || isClearing}>
              Clear
            </Button>
          </div>
          {selectedFile && (
            <div className="mt-1 text-xs text-white">
              Selected file: {selectedFile.name}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
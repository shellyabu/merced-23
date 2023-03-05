import * as React from 'react';
import {
    createAccount,
    updateOnAuthStateChanged,
    signOutUser,
    signInUser,
    dbAddComment,
    updateOnSnapshot,
  } from './firebase.js';
  import './App.css';
  import {
    TextField,
    Typography,
    Stack,
    Divider,
    Button,
    Card,
    CardContent,
    Input,
    InputAdornment,
    OutlinedInput,
    IconButton,
  } from '@mui/material';
  import { useEffect, useRef, useState } from 'react';
  
  function signUpUser(email, password) {
    const username = prompt('insert username');
    if (username) {
      createAccount(username, email, password);
    } else {
      alert('no username entered');
    }
  }
  
  //account stuff
  function AccountComponent(user) {
    if (user) {
      return (
        <Stack direction="column" alignItems="flex-start">
          <Typography gutterBottom variant="body1">
            signed in as <b>{user.displayName}</b>
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              signOutUser();
            }}
          >
            Sign Out
          </Button>
        </Stack>
      );
    } else {
      return <InForm />;
    }
  }
  
  function InForm() {
    const email_ref = useRef('');
    const password_ref = useRef('');
    return (
      <Stack direction="column" spacing={2}>
        <Input inputRef={email_ref} id="email-input" placeholder="email" />
        <Input
          inputRef={password_ref}
          id="password-input"
          placeholder="password"
          type="password"
        />
  
        <Stack direction="row" justifyContent="space-around">
          <Button
            variant="outlined"
            onClick={() => {
              signInUser(email_ref.current.value, password_ref.current.value);
            }}
          >
            login
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              signUpUser(email_ref.current.value, password_ref.current.value);
            }}
          >
            sign up
          </Button>
        </Stack>
      </Stack>
    );
  }
  
  //comment stuff
  function CommentsSection({ user }) {
    const comment_ref = useRef([]);
    const [comments, setComments] = useState([]);
  
    useEffect(() => {
      updateOnSnapshot((snapshot) => {
        const comments = [];
        snapshot.forEach((document) => {
          const docData = document.data();
          comments.push(
            <Comment username={docData.username} content={docData.comment} />
          );
        });
        setComments(comments);
      });
    }, []);
  
    return (
      <Stack direction="column" spacing={2}>
        <Typography gutterBottom variant="h4">
          Comments
        </Typography>
  
        <OutlinedInput
          multiline
          inputRef={comment_ref}
          disabled={user ? false : true}
          id="comment-field"
          placeholder="comment here..."
          endAdornment={
            <InputAdornment
              position="end"
              sx={{ position: 'absolute', bottom: 20, right: 5 }}
            >
              <IconButton
                onClick={() => {
                  dbAddComment(
                    user.uid,
                    user.displayName,
                    comment_ref.current.value
                  );
                  comment_ref.current.value = '';
                }}
                disabled={user ? false : true}
              >
                <Button>Send</Button>
              </IconButton>
            </InputAdornment>
          }
        />
        <Stack direction="column" spacing={2}>
          {comments}
        </Stack>
      </Stack>
    );
  }
  
  function Comment({ username, content }) {
    return (
      <Card className="comment-bg">
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {username}
          </Typography>
          <Typography variant="body2">{content}</Typography>
        </CardContent>
      </Card>
    );
  }
  
  export default function App() {
    const [user, setUser] = useState();
    updateOnAuthStateChanged((userIn) => {
      setUser(userIn);
    });
  
    return (
      <Stack direction="column" spacing={3}>
        <Typography variant="h4">Account</Typography>
        {AccountComponent(user)}
        <Divider />
        <CommentsSection user={user} />
      </Stack>
    );
  }
  
  
import React, { useRef } from 'react';
import { firestore } from "./firebase";
import { addDoc, collection } from "@firebase/firestore"
import {Button} from '@mui/material';

export default function () {
    const messageRef = useRef();
    const ref = collection(firestore, "messages");


    const handleSave = async(e) => {
        e.preventDefault();
        console.log(messageRef.current.value);

        let data = {
            message:messageRef.current.value,
        }

        try {
            addDoc(ref,data)
        }catch(e){
            console.log(e);
        }
    };

  return (
    <div>
        <form onSubmit={handleSave}>
            <label>Business Name: </label>
            <input type="text" placeholder='Business Name' ref={messageRef} />
            <label>Password: </label>
            <input type="password" placeholder='Password' ref={messageRef} />

            <Button type="submit">
                Submit
            </Button>
        </form>
    </div>
  )
}
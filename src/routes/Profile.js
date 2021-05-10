import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

export default ({refreshUser,userObj})=>{
    const history = useHistory();
    const [newDisplayName,setNewDisplayName]=useState(userObj.displayName);
    const onoLogOutClick=()=> {
        authService.signOut();
        history.push("/");
        refreshUser();
    }
    
    const onChange=(event)=>{
        const{
            target:{value}
        }=event;
        setNewDisplayName(value);
    }

    const getMyNweets= async()=>{
        const nweets=await dbService
        .collection("nweets")
        .where("creatorId","==",userObj.uid)
        .orderBy("createAt","desc") //asc는 올림차순 desc는 내림차순
        .get()  //where은 필터링을 도와줌
        console.log(nweets.docs.map((doc)=>doc.data()))
    }
    useEffect(()=>{
        getMyNweets();
    },[])
    const onSubmit=async(event)=>{
        event.preventDefault();
        if(userObj.displayName!==newDisplayName){
            await userObj.updateProfile({
                displayName:newDisplayName,
            });
            refreshUser();
        }
    }
    
    return (
        <>
        <form onSubmit={onSubmit}>
            <input 
                type="text" 
                placeholder="Display name"
                onChange={onChange}
                value={newDisplayName}/>
            <input type="submit" value="Update Profile"/>
        </form>
        <button onClick={onoLogOutClick}>Log Out</button>
        </>
    )
}

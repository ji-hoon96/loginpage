import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Home=({userObj})=>{
    const [nweets,setNweets]=useState([]);
    useEffect(()=>{
        dbService.collection("nweets").onSnapshot(snapshot=>{ //onSnapshot은 db에서 정보를 받아옴
            const nweetArray= snapshot.docs.map(doc=>({
                id:doc.id, 
                ...doc.data()}));
            setNweets(nweetArray);
        });
    },[]);
    return(
        <div>
            <NweetFactory userObj={userObj}/>
            <div>
                {nweets.map((nweet)=>(
                    <Nweet 
                    key={nweet.id} 
                    nweetObj={nweet}
                    isOwner={nweet.creatorId===userObj.uid}/>
                ))}
            </div>
        </div>
    )
}
export default Home;
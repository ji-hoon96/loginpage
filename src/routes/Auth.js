import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'fbase';
import React, { useState } from 'react';
const Auth=()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount,setNewAccount]=useState(true);
    const [error,setError]=useState(""); //에러생성시 에러 표시
    const onChange = (event)=>{
      const {target:{name,value}}=event; // const {name,value}=event.target 과 동일
      if(name==="email"){
          setEmail(value)
      }else if(name==="password"){
          setPassword(value)
      }
    }
    const onSubmit = async(event)=>{
        event.preventDefault(); // onSubmit에서 event.preventDefault를 한 이유는 submit했을때 초기화 X
        try{
            let data
            if(newAccount){
                data=await authService.createUserWithEmailAndPassword(
                    email,password
                );
                //newAccount 가 true 일떄는 create Account(계정생성버튼)
            }else{
                data=await authService.signInWithEmailAndPassword(email,password);
                //new Account 가 false 일떄는 Login 되어있는 상태(로그인)
            }
        } catch(error){
            setError(error.message);
        }
    }
    const toggleAccount = () =>setNewAccount((prev)=>!prev); // 이전값 prev 를 true랑 false로 변경해서 span onclick했을때 값 변경
    const onSocialClick =async(event)=>{
        const {target: {name},} = event; // 이것은 const {name} = event.target  과 같다  event.target.name을 name에할당 es6에 있음 참고
        let provider;
        if(name==="google"){
            provider=new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name==="github"){
            provider= new firebaseInstance.auth.GithubAuthProvider();
        }
        const data= await authService.signInWithPopup(provider);
    }

    return(
        <div>
            <AuthForm/>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue withe Github</button>
            </div>
        </div>
    )
}

 
export default Auth;

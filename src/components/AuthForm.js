import { authService } from "fbase";
import React, { useState } from "react";

const AuthForm=()=>{
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
    return(
        <>
        <form onSubmit={onSubmit}>
                <input 
                    name="email" 
                    type="text" 
                    placeholder="Email" 
                    required 
                    value={email}
                    onChange={onChange}/>
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    required 
                    value={password}
                    onChange={onChange}/>
                <input type="submit" value={newAccount ? "Creat Account" : "Log In"}/>
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
            </>
    )
};

export default AuthForm;
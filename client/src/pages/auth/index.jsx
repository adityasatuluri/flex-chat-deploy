import Background from '@/assets/flogo-auth.svg'
import Flexchat from '@/assets/flexchat-logo.svg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client"
import { SIGNUP_ROUTE, LOGIN_ROUTE, GET_USER_INFO } from "@/utils/constants"
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store'

const Auth = () => {
  const navigate = useNavigate();
  const {setUserInfo} = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const validateLogin = () => {
    if(!email.length) {
      toast.error("Email is required");
      return false;
    }
    if(!password.length) {
      toast.error("password id required");
      return false;
    }
    return true
  };

  const validateSignup = () => {
    if(!email.length) {
      toast.error("Email is required");
      return false;
    }
    if(!password.length || ! confirmPassword.length) {
      toast.error("password id required");
      return false;
    }
    if(password !== confirmPassword) {
      toast.error("Both password should be same");
      return false;
    }
    return true;
  }

  const handleLogin = async() => {
    if(validateLogin()) {
      const response = await apiClient.post(
        LOGIN_ROUTE,
        {email, password},
        {withCredentials: true}
      );
      if(response.data.user.id) {
        setUserInfo(response.data.user)
        if(response.data.user.profileSetup)
          navigate("/chat")
        else
          navigate("/profile")
      }
      console.log({response});
    }
  };

  const handleSignup = async() => {
    if(validateSignup()){
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        {email,password},
        {withCredentials: true}
      );
      if(response.status === 201) {
        setUserInfo(response.data.user)
        navigate("/profile")
      }
        console.log({response});
    }
  };

  return (
    <div className='h-[100vh] w-[100vw] bg-[#151515] flex items-center justify-center'>
      <div className='h-[80vh] bg-[#151515] border-2 border-[#151515] text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2'>
        <div className='flex flex-col gap-10 items-center justify-center ml-10 mr-14'>
          <div className='flex items-center justify-center flex-col'>
            <div className='flex items-center justify-center'>
                
                <img src={Flexchat} alt="Logo" className='h-[100px]' />  
            </div>
                <p className='font-medium text-center text-white'>Fill in the details to get started.</p>
          </div>
          <div className='flex items-center justify-center w-full'>
            <Tabs className='w-3/4' defaultValue='login'>
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="bg-transparent text-white/85 border-b-2 rounded-none w-full data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:border-b-[#32CD32] data-[state=active]:bg-transparent transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="bg-transparent text-white/85 border-b-2 rounded-none w-full data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:border-b-[#32CD32] data-[state=active]:bg-transparent transition-all duration-300"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input placeholder="Email" 
                  type="email" 
                  className="rounded-full p-6" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <Input placeholder="password" 
                  type="password" 
                  className="rounded-full p-6" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <Button className='rounded-full p-6 bg-[#32CD32] hover:bg-[#23ad23] text-black' onClick={handleLogin}>Login</Button>
              </TabsContent>

              <TabsContent className="flex flex-col gap-5" value="signup">
              <Input placeholder="Email" 
                  type="email" 
                  className="rounded-full p-6" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <Input placeholder="password" 
                  type="password" 
                  className="rounded-full p-6" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <Input placeholder="Confirm Password" 
                  type="password" 
                  className="rounded-full p-6" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                <Button className='rounded-full p-6 bg-[#32CD32] hover:bg-[#23ad23] text-black' onClick={handleSignup}>Sign Up</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className='hidden xl:block bg-cover rounded-3xl opacity-100' style={{ backgroundImage: `url(${Background})` }}></div>

      </div>
    </div>
  );
}

export default Auth;
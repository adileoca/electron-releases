import { useState } from "react";

import { useSupabase } from "@/lib/supabase/context";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Logo from "@/static/logo.svg";

const Login = ({ searchParams }: { searchParams?: any }) => {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    console.log("signin in...");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data) console.log("loginData: ", data);
    if (error) console.log("loginError: ", error);
  };
  return (
    <div className="draggable flex h-screen w-full bg-neutral-900 bg-cover antialiased">
      <div className="m-auto my-auto place-content-center">
        <div className="flex w-96 flex-col gap-8 p-4">
          {/* {['success', 'error', 'message'].some(
            param => param in searchParams
            ) && <FormMessage message={searchParams} />} */}
          <div className="flex flex-col space-y-4">
            <div className="-mt-[20px] mb-0 flex justify-center">
              <img
                src={Logo}
                alt="logo"
                width={40}
                height={40}
                className="rounded-full bg-blue-500 p-px "
              />
            </div>
            <div className="-space-y-px rounded-md">
              <Input
                className="relative z-10 h-10 w-full  rounded-t-md  focus:z-50"
                type="email"
                name="email"
                placeholder="you@adipan.eu"
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                className="relative z-10 h-10 w-full rounded-b-md focus:z-50"
                type="password"
                name="password"
                placeholder="Parola"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={() => handleSignIn()}>Autentificare</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

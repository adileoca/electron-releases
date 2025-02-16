import Logo from "@/static/logo.svg";
import { useState } from "react";
// import { FormMessage, Message } from '@/components/FormMessage';
import { Supabase } from "@/lib/supabase/database";
import { useSupabase } from "@/lib/supabase/context";
import Input from "@/components/ui/Input";
import CardWrapper from "@/components/ui/CardWrapper";
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
        <CardWrapper>
          <div className="flex w-96 flex-col gap-8 p-4">
            {/* {['success', 'error', 'message'].some(
            param => param in searchParams
          ) && <FormMessage message={searchParams} />} */}
            <div className="flex flex-col gap-4 ">
              <Input
                className="h-12 rounded-md"
                type="email"
                name="email"
                placeholder="you@adipan.eu"
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                className="h-12 w-full rounded-md"
                type="password"
                name="password"
                placeholder="Parola"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex justify-end pt-2">
                <div className=" rounded-md bg-gradient-to-t from-blue-500 from-80% to-blue-400 p-px">
                  <button
                    onClick={() => handleSignIn()}
                    className="h-8 rounded-[5px] bg-blue-600 px-4 font-medium text-white/90 transition hover:bg-blue-500"
                  >
                    Autentificare
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CardWrapper>
      </div>
    </div>
  );
};

export default Login;

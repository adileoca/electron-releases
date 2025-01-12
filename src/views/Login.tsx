import Logo from "@/static/logo.svg";
import { useState } from "react";
// import { FormMessage, Message } from '@/components/FormMessage';
import { Supabase } from "@/lib/supabase/database";
import { useSupabase } from "@/lib/supabase/context";
import Input from "@/components/ui/Input";

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
      <div className="m-auto my-auto place-content-center rounded-3xl bg-white/75 p-8 backdrop-blur-3xl dark:bg-neutral-800/75">
        <div className="flex w-96 flex-col gap-8">
          <a href="/">
            <img
              className="block h-8 w-auto rounded-full ring-blue-500 ring-offset-2 transition hover:ring-2 lg:h-12"
              src={Logo}
              alt=""
              loading="eager"
            />
          </a>
          <div>
            <h1 className="text-3xl font-medium dark:text-white">Welcome</h1>
            <p className="text-lg dark:text-white">
              Forgot your password?{" "}
              <a
                className="text-foreground font-medium text-neutral-900 underline transition hover:text-blue-900 dark:text-white"
                href="/sign-up"
              >
                Sign up
              </a>
            </p>
          </div>

          {/* {['success', 'error', 'message'].some(
            param => param in searchParams
          ) && <FormMessage message={searchParams} />} */}
          <div className="flex flex-col gap-8 [&>input]:mb-3">
            <div className="flex flex-col space-y-2 ">
              <label htmlFor="email" className="dark:text-white">
                Email
              </label>
              <Input
                className="h-12 rounded-lg"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className=" dark:text-white">
                  Password
                </label>
                <a
                  className="text-foreground underline transition hover:text-blue-900 dark:text-white"
                  href="/forgot-password"
                >
                  Forgot Password?
                </a>
              </div>
              <Input
                className="h-12 w-full rounded-lg"
                type="password"
                name="password"
                placeholder="Your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => handleSignIn()}
                className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-500"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

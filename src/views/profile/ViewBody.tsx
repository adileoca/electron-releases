import { useSupabase } from "@/lib/supabase/context";
import Button from "@/components/ui/Button";

const Profile = () => {
  const { supabase } = useSupabase();
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-transparent">Contul meu</h1>
        <div>
          <Button onClick={() => supabase.auth.signOut()}>Delogare</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

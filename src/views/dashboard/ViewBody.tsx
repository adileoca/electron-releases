import { useDatabase } from "@/lib/supabase/context";

const Dashboard = () => {
  const { userProfile } = useDatabase();
  return (
    <div className="p-4">
      <h1 className="text-2xl text-white/80 font-semibold"> Bun venit, {userProfile?.name}</h1>
    </div>
  );
};

export default Dashboard;

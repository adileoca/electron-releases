import Button from "@/components/ui/Button";

const Profile = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-transparent">Contul meu</h1>
        <div>
          <Button
            onClick={() => {
              localStorage.removeItem("sb-vrdaoudvtphptybaljqq-auth-token");
              window.location.reload();
            }}
          >
            Delogare
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

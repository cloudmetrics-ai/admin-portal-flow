
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/api";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Loading...</h1>
        <p className="text-xl text-muted-foreground">Redirecting to the appropriate page</p>
      </div>
    </div>
  );
};

export default Index;

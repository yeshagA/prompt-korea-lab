import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({
  children,
  requireProfile = true,
}: {
  children: React.ReactNode;
  requireProfile?: boolean;
}) => {
  const { isLoggedIn, isProfileComplete } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (requireProfile && !isProfileComplete) return <Navigate to="/profile-setup" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
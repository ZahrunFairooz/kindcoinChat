import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Assuming you have an AuthContext

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;

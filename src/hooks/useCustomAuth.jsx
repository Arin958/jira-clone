import { useContext } from "react";
import { AuthContext } from "../contexts/Context";

export default function useCustomAuth(){
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useCustomAuth must be used within AuthProvider');
  }
  return context;
};
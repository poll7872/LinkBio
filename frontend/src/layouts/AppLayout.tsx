import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/LinkBioAPI";
import { LinkBio } from "../components/LinkBio";

export const AppLayout = () => {

  const { data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ['user'],
    retry: 1,
    refetchOnWindowFocus: false,
  })

  return (
    <div className="relative min-h-screen">
      {/* Background decoration */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-violet-100 via-pink-100 to-pink-100 opacity-30"></div>

      {/* Content */}
      <div className="relative z-10">
        {isLoading && <div className="flex justify-center items-center min-h-screen text-2xl font-bold text-violet-600">Cargando...</div>}
        {isError && <Navigate to={'/auth/login'} />}
        {data && <LinkBio data={data} />}
      </div>
    </div>
  )
}
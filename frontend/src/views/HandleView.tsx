import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"
import { getUserByHandle } from "../api/LinkBioAPI"
import { HandleData } from "../components/HandleData"

export const HandleView = () => {
  const params = useParams()
  const handle = params.handle!

  const { data, error, isLoading } = useQuery({
    queryFn: () => getUserByHandle(handle),
    queryKey: ['handle', handle],
    retry: false
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-500 to-pink-500">
        <p className="text-white text-2xl font-bold">Cargando...</p>
      </div>
    )
  }
  if (error) return <Navigate to={'/404'} />

  if (data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-500 to-pink-500 py-10 px-4">
        <div className="max-w-lg mx-auto">
          <HandleData data={data} />
        </div>
      </div>
    )
  }
}

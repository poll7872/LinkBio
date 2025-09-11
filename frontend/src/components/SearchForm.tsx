import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import { ErrorMessage } from "../components/ErrorMessage";
import { GradientButton } from "../components/GradientButton";
import { useMutation } from "@tanstack/react-query";
import { searchByHandle } from "../api/LinkBioAPI";
import { Link } from "react-router-dom";
import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/20/solid";

export const SearchForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      handle: ''
    }
  })

  const mutation = useMutation({
    mutationFn: searchByHandle,
  })

  const handle = watch("handle")

  const handleSearch = () => {
    const slug = slugify(handle)
    mutation.mutate(slug)
  }

  console.log(mutation.data)

  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      className="space-y-5">
      <div className="relative flex items-center bg-white rounded-full shadow-md overflow-hidden p-2">
        <label
          htmlFor="handle"
          className="pl-3 text-slate-500"
        >linkbio.com/</label>
        <input
          type="text"
          id="handle"
          className="border-none bg-transparent text-black p-2 focus:ring-0 flex-1"
          placeholder="elonmusk, zuck, jeffbezos"
          {...register("handle", {
            required: "Un Nombre de Usuario es obligatorio",
          })}
        />

      </div>
      {errors.handle && (
        <ErrorMessage>{errors.handle.message}</ErrorMessage>
      )}

      <div className="mt-8">
        {mutation.isPending && (
          <div className="flex justify-center items-center gap-2 text-white">
            <ArrowPathIcon className="animate-spin h-5 w-5" />
            <p className="text-lg">Buscando...</p>
          </div>
        )}
        {mutation.isError && (
          <ErrorMessage>{mutation.error.message}</ErrorMessage>
        )}
        {mutation.data && (
          <div className="flex justify-center items-center gap-2 text-white bg-green-500/20 border border-green-500 p-3 rounded-lg">
            <CheckCircleIcon className="w-6 h-6 text-green-400" />
            <p className="font-bold text-lg">
              {mutation.data.message} - Ir a{' '}
              <Link
                to={'/auth/register'}
                state={{ handle: slugify(handle) }}
                className="text-pink-400 hover:underline"
              >
                Registro
              </Link>
            </p>
          </div>
        )}
      </div>

      <GradientButton type="submit">OBTENER MI LINKBIO</GradientButton>
    </form>)
}

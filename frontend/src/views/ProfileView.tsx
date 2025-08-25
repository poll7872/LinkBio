import { useForm } from "react-hook-form"
import { ErrorMessage } from "../components/ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { profileForm, User } from "../types"
import { updateProfile, uploadImage } from "../api/LinkBioAPI"
import { toast } from "sonner"
import { GradientButton } from "../components/GradientButton"

export const ProfileView = () => {

  const queryClient = useQueryClient()
  const data: User = queryClient.getQueryData(['user'])!

  const { register, handleSubmit, formState: { errors } } = useForm<profileForm>({
    defaultValues: {
      handle: data.handle,
      description: data.description,
    }
  })

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], (prevData: User) => {
        return {
          ...prevData,
          image: data
        }
      })
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadImageMutation.mutate(e.target.files[0])
    }
  }

  const handleUserProfileForm = (formData: profileForm) => {
    const user: User = queryClient.getQueryData(['user'])!
    user.description = formData.description;
    user.handle = formData.handle;
    updateProfileMutation.mutate(user)
  }

  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="handle"
        >Handle:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="handle o Nombre de Usuario"
          {...register('handle', {
            required: 'El handle es obligatorio',
          })}
        />

        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="description"
        >Descripción:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu Descripción"
          {...register('description', {
            required: 'La descripción es obligatoria',
          })}
        />

        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="handle"
        >Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <GradientButton type="submit">Guardar Cambios</GradientButton>
    </form>
  )
}

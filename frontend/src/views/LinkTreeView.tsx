import { useState } from 'react'
import { social } from '../data/social'
import { LinkTreeInput } from '../components/LinkTreeInput'
import { isValidUrl } from '../utils'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfile } from '../api/LinkBioAPI'
import { GradientButton } from '../components/GradientButton'
import type { User } from '../types'

export const LinkTreeView = () => {
  const [linkTreeLinks, setLinkTreeLinks] = useState(social)

  const queryClient = useQueryClient()
  const user: User = queryClient.getQueryData(['user'])!

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Actualizado con exito')
    }
  })

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLink = linkTreeLinks.map(link => link.name === e.target.name ? { ...link, url: e.target.value } : link)
    setLinkTreeLinks(updatedLink)
  }

  const handleEnableLink = (socialNetwork: string) => {
    const updateLink = linkTreeLinks.map(link => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled }
        } else {
          toast.error('URL no valida')
        }
      }
      return link
    })
    setLinkTreeLinks(updateLink)

    queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updateLink)
      }
    })
  }

  return (
    <div className='space-y-5'>
      {linkTreeLinks.map(item => (
        <LinkTreeInput
          key={item.name}
          item={item}
          handleUrlChange={handleUrlChange}
          handleEnableLink={handleEnableLink}
        />
      ))}
      <GradientButton type='submit' onClick={() => mutate(user)}>Guardar Cambios</GradientButton>
    </div>
  )
}

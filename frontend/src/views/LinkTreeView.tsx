import { useState, useEffect } from 'react'
import { social } from '../data/social'
import { LinkTreeInput } from '../components/LinkTreeInput'
import { isValidUrl } from '../utils'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfile } from '../api/LinkBioAPI'
import { GradientButton } from '../components/GradientButton'
import type { User, LinkTree, SocialNetwork } from '../types'

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

  useEffect(() => {
    const updatedData = linkTreeLinks.map(item => {
      const userLink = JSON.parse(user.links).find((link: LinkTree) => link.name === item.name)
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled }
      }
      return item
    })

    setLinkTreeLinks(updatedData)
  }, [])


  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLink = linkTreeLinks.map(link => link.name === e.target.name ? { ...link, url: e.target.value } : link)
    setLinkTreeLinks(updatedLink)
  }

  const links: SocialNetwork[] = JSON.parse(user.links)

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

    let updatedItems: SocialNetwork[] = []

    const selectedSocialNetwork = updateLink.find(link => link.name === socialNetwork)
    if (selectedSocialNetwork?.enabled) {

      const id = links.filter(link => link.id > 0).length + 1

      if (links.some(link => link.name === socialNetwork)) {
        updatedItems = links.map(link => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              enabled: true,
              id: id
            }
          } else {
            return link
          }
        })
      } else {
        const newItem = {
          ...selectedSocialNetwork,
          id: id
        }
        updatedItems = [...links, newItem]

      }

    } else {
      const indexToUpdate = links.findIndex(link => link.name === socialNetwork)
      updatedItems = links.map(link => {
        if (link.name === socialNetwork) {
          return {
            ...link,
            id: 0,
            enabled: false
          }
        } else if (link.id > indexToUpdate && (indexToUpdate !== 0 && link.id === 1)) {
          return {
            ...link,
            id: link.id - 1
          }
        } else {
          return link
        }
      })
    }

    //Se almacenar en la base de datos
    queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems)
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
      <GradientButton type='submit' onClick={() => mutate(queryClient.getQueryData(['user'])!)}>Guardar Cambios</GradientButton>
    </div>
  )
}

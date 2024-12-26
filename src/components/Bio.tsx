'use client'
import { useCallback, useEffect, useState } from 'react'
import { fetchMutation, fetchQuery } from 'convex/nextjs'
import { useSession } from 'next-auth/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FilePenLine, Trash } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'

import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { Spinner } from './ui/spinner'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Textarea } from './ui/textarea'
import { LoadingButton } from './ui/loading-button'

interface Bio {
  _id: Id<'bioTelainicial'>
  bio: string
  ordem: string
}

const formSchema = z.object({
  id: z.string().optional(),
  bio: z.string().min(3, { message: 'Digite uma Bio' }),
})

export function Bio() {
  const [bioSite, setBioSite] = useState<Bio[]>([])
  const [carregou, setiscarregou] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: '',
    },
  })

  const { data: session } = useSession()

  const loadBio = useCallback(async () => {
    if (session) {
      fetchQuery(api.bioTelainicial.getAllbioTelainicialRole).then((result) => {
        setBioSite(result)
      })
    }
  }, [session])

  useEffect(() => {
    if (session) {
      if (!carregou) {
        loadBio()
        setiscarregou(true)
      }
    }
  }, [loadBio, session, carregou, setiscarregou])

  const removeBio = async (id: Id<'bioTelainicial'>) => {
    setLoading(true)

    await fetchMutation(api.bioTelainicial.remove, { bioId: id })

    loadBio()
    setLoading(false)
  }

  const editBio = async (id: Id<'bioTelainicial'>, bio: string) => {
    form.setValue('id', id)
    form.setValue('bio', bio)
    setOpen(true)
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data)
    setLoading(true)

    if (data.id) {
      await fetchMutation(api.bioTelainicial.UpdatebioTelainicial, {
        bioTelainicialId: data.id as Id<'bioTelainicial'>,
        bio: data.bio,
      })

      toast({
        title: 'ok',
        description: 'Cadastro alterado.',
      })

      form.reset({
        bio: '',
        id: undefined,
      })
      setLoading(false)
      setOpen(false)

      loadBio()
    } else {
      try {
        const bio = await fetchMutation(api.bioTelainicial.create, {
          bio: data.bio,
          ordem: '1',
        })

        if (!bio) {
          toast({
            title: 'Erro',
            variant: 'destructive',
            description: 'Bio não cadastrada',
          })
          setLoading(false)
          setOpen(false)
          return
        }

        toast({
          title: 'OK',
          description: 'Bio Cadastrada.',
        })

        setLoading(false)
        setOpen(false)
        form.reset()
        loadBio()
      } catch (error) {
        console.error(error)

        toast({
          title: 'Erro',
          variant: 'destructive',
          description: 'Ocorreu um erro ao Cadastrar bio.',
        })
        setLoading(false)
        setOpen(false)
      }
    }
    setLoading(false)
  }

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      form.reset({
        bio: '',
        id: undefined,
      })
    }
  }

  return (
    <div className="space-y-8">
      <Dialog open={open} onOpenChange={handleDialogChange}>
        <DialogTrigger className="  text-center text-sm text-muted-foreground underline underline-offset-4 hover:text-primary">
          <Button> + </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex w-full items-center gap-4"
                >
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Textarea placeholder="Bio" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Salvar</Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <ScrollArea className="h-[calc(80vh-220px)] w-full overflow-x-auto rounded-md border">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Bio</TableHead>
              {/* <TableHead className="text-center">Ordem</TableHead> */}
              <TableHead className="text-end">Opções</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bioSite ? (
              bioSite.map((bio) => (
                <TableRow key={bio._id}>
                  <TableCell className="text-center">{bio.bio}</TableCell>
                  {/*            <TableCell className="text-center">{bio.ordem}</TableCell> */}

                  <TableCell className="flex items-end justify-end gap-2">
                    <LoadingButton
                      loading={loading}
                      onClick={() => editBio(bio._id, bio.bio)}
                    >
                      <FilePenLine className="h-4 w-4" />
                    </LoadingButton>
                    <LoadingButton
                      loading={loading}
                      variant={'destructive'}
                      onClick={() => removeBio(bio._id)}
                    >
                      <Trash className="h-4 w-4" />
                    </LoadingButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Spinner />
            )}
          </TableBody>
        </Table>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

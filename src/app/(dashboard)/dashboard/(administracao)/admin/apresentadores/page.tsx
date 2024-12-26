import BreadCrumb from '@/components/breadcrumb'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Heading } from '@/components/ui/heading'
import { UsuariosAdministradores } from '@/components/UsuariosAdministradores'

const breadcrumbItems = [
  { title: 'Administração', link: '/dashboard/admin' },
  { title: 'Apresentadores', link: '/dashboard/admin/apresentadores' },
]
export default function page() {
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <div className=" flex items-start justify-between gap-4">
          <Heading
            title={'Apresentadores'}
            description={'Adicionar ou alterar apresetnadores da tela inicial'}
          />
        </div>
        <UsuariosAdministradores />
      </div>
    </ScrollArea>
  )
}

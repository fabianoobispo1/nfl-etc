import { Podcast } from '@/components/podcasts';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nfl Etc',
  description: 'Pagina inicial do meu sistema',
  keywords: 'Fabiano Bispo Canedo, Fabiano Bispo, fabiano bispo, fabianoobispo, @fabianoobispo, fabiano bispo canedo'

};

export default function HomePage() {
  return (
    <ScrollArea className="h-full w-screen ">
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8  ">
      <div className="flex items-center justify-center space-y-2 ">
        <Podcast />
      </div>
    </div>
  </ScrollArea>
  );
}

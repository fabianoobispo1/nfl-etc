import { Podcast } from '@/components/podcasts';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
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

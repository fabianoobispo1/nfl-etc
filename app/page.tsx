import { Podcast } from '@/components/podcasts';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
  return (
    <ScrollArea className="h-full w-screen ">
      <div className="flex-1 space-y-6 bg-gray-300 p-4 pt-6  md:p-8">
        <Podcast />
      </div>
    </ScrollArea>
  );
}

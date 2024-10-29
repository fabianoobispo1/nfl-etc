import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET(req: NextRequest) {
  try {
    const linkRSS = 'https://anchor.fm/s/2b3ad0b0/podcast/rss';
    const feed = await parser.parseURL(linkRSS);
console.log(feed)
    // Mapear os dados do feed e pegar apenas os 3 últimos lançados
    const episodesData = feed.items.slice(0, 4).map((item: any) => ({
      
      title: item.title,
      link: item.link,
      enclosure: item.enclosure, // Pode incluir o link para o arquivo de áudio
      pubDate: item.pubDate,
      contentSnippet: item.contentSnippet,
      content: item.content,
      duration: item.itunes?.duration, // Duração do episódio
      image: item.itunes?.image, // Imagem específica do iTunes (se existir)
      episode: item.itunes?.episode, // Número do episódio
      episodeType: item.itunes?.episodeType, // Tipo de episódio (completo, trailer, etc)
      summary: item.itunes?.summary // Resumo do episódio
    }));

    return NextResponse.json(
      { message: 'Podcasts recuperados com sucesso.', podcasts: episodesData },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Erro ao conectar ao RSS feed.' },
      { status: 500 }
    );
  }
}

'use client'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { parse, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Skeleton } from './ui/skeleton'
import AudioPlayer from './AudioPlayer'

// Importa os estilos do Swiper
import 'swiper/css'
import 'swiper/css/navigation'

interface PodcastEpisode {
  title: string
  link: string
  enclosure: { url: string }
  episodeType: string
  image: string
  pubDate: string
  content: string
  contentSnippet: string
  duration: string
}
export function Podcast() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([])
  const [loading, setLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false) // Estado para expandir/colapsar o texto
  const episodeRef = useRef<HTMLDivElement>(null) // Ref para o início da seção do episódio
  const [exibePlayer, setExibePlayer] = useState(false)
  const [episodioSelecionado, setEpisodioSelecionado] = useState('')

  useEffect(() => {
    loadPodcast()
  }, [])

  const loadPodcast = async () => {
    setLoading(true)
    const response = await fetch(`/api/podcast/listar`)
    console.log(response)
    const { podcasts } = await response.json()
    console.log(podcasts)
    setEpisodes(podcasts)

    setLoading(false)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
    if (isExpanded && episodeRef.current) {
      episodeRef.current.scrollIntoView({ behavior: 'smooth' }) // Volta ao início da seção ao colapsar
    }
  }

  const playNow = () => {
    setEpisodioSelecionado(episodes[0].title)

    setExibePlayer(true)
  }

  return (
    <div className="min-h-screen rounded-lg bg-gray-100">
      {/* Header */}

      <div className="rounded-t-lg bg-[#2b6d27] px-4 py-8 text-center text-white">
        <div className="container mx-auto flex flex-col items-center md:flex-row">
          <Image
            src="/logoNFLETC.jpg"
            alt="Logo NFL-ETC Podcast"
            width={150}
            height={150}
            className="mx-auto rounded-sm"
          />
          <div className="container mx-auto flex flex-col items-center">
            <h1 className="mt-4 text-3xl font-bold md:text-4xl">
              NFL-ETC Podcast
            </h1>
            <p className="mt-2 max-w-md text-base md:text-lg">
              O melhor sobre futebol americano com 3 apresentadores apaixonados
              pelo esporte!
            </p>
            <p className="mt-1 text-sm md:text-base">
              Episódios novos toda terça-feira
            </p>
          </div>
        </div>
      </div>

      {/* Último Episódio */}
      <div className="container mx-auto my-8 px-4 " ref={episodeRef}>
        <h2 className="mb-4 text-xl font-bold text-gray-800 md:text-2xl">
          Último Episódio
        </h2>
        {loading ? (
          <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md md:flex-row md:p-6">
            <div className="">
              <Image
                src="/carousel-1.svg"
                alt="Capa do último episódio"
                width={500}
                height={300}
                className="h-80 w-80 rounded-md"
              />
            </div>
            <div className="mt-2  w-full md:mt-16">
              <Skeleton className="h-8 w-full p-2" />

              <Skeleton className="h-4 w-full p-2" />

              <Skeleton className="h-4 w-full p-2" />
              <Skeleton className="mt-4 h-4 w-full p-2" />
              <Skeleton className="mt-4 h-4 w-full p-2" />
              <button className="mt-4 inline-block rounded bg-[#68B96D] px-4 py-2 text-white hover:bg-green-600">
                -
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md md:flex-row md:p-6">
            <div className="">
              <Image
                src={episodes[0].image}
                alt="Capa do último episódio"
                width={500}
                height={300}
                className="h-auto w-full rounded-md"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900 md:text-xl">
                {episodes[0].title}
              </h3>
              <p className="mt-2 text-gray-600">
                Data de lançamento:{' '}
                {format(
                  parse(
                    episodes[0].pubDate,
                    "EEE, dd MMM yyyy HH:mm:ss 'GMT'",
                    new Date(),
                  ),
                  "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                  { locale: ptBR },
                )}
              </p>
              <div className="mt-4 text-gray-700">
                <p
                  className={`mt-4 text-gray-700 ${
                    isExpanded ? '' : 'line-clamp-3'
                  }`}
                >
                  <span
                    dangerouslySetInnerHTML={{ __html: episodes[0].content }}
                  />
                </p>

                <button
                  onClick={toggleExpand}
                  className="mt-2 text-blue-500 hover:underline"
                >
                  {isExpanded ? 'Mostrar menos' : 'Mostrar mais'}
                </button>
              </div>
              <button
                onClick={() => {
                  playNow()
                }}
                className="mt-4 inline-block rounded bg-[#68B96D] px-4 py-2 text-white hover:bg-green-600"
              >
                Ouça Agora
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lista de Episódios Recentes */}
      {/*  <div className="container mx-auto my-8 px-4">
        <h2 className="mb-4 text-xl font-bold text-gray-800 md:text-2xl">
          Episódios Recentes
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"> */}
      {/* Exemplo de episódio */}
      {/*   <div className="rounded-lg bg-white p-4 shadow-md md:p-6">
            <h3 className="text-lg font-semibold text-gray-900 md:text-xl">
              Episódio 9: Expectativas para a Semana 5
            </h3>
            <p className="mt-2 text-gray-600">
              Data de lançamento: 3 de outubro de 2024
            </p>
            <Link
              href="#"
              className="mt-4 inline-block rounded bg-[#68B96D] px-4 py-2 text-white hover:bg-green-600"
            >
              Ouça Agora
            </Link>
          </div> */}
      {/* Repita para outros episódios */}
      {/*        </div>
      </div> */}

      {/* Apresentadores */}
      <div className="bg-gray-200 px-4 py-8">
        <div className="container mx-auto text-center">
          <h2 className="mb-6 text-xl font-bold text-gray-800 md:text-2xl">
            Apresentadores
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Apresentador 1 */}
            <div className="rounded-lg bg-white p-4 shadow-md md:p-6">
              <Image
                src="/ticasPic.jpg" // Substitua com a imagem real do apresentador
                alt="Apresentador 1"
                width={150}
                height={150}
                className="mx-auto rounded-full"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-900 md:text-xl">
                Ticas
              </h3>
              <p className="mt-2 text-gray-600">
                Especialista em estatísticas e analista de desempenho da NFL.
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md md:p-6">
              <Image
                src="/wallacePic.jpg" // Substitua com a imagem real do apresentador
                alt="Apresentador 1"
                width={150}
                height={150}
                className="mx-auto rounded-full"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-900 md:text-xl">
                Wallace Mattos
              </h3>
              <p className="mt-2 text-gray-600">
                Especialista em estatísticas e analista de desempenho da NFL.
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md md:p-6">
              <Image
                src="/victorinoPic.jpg" // Substitua com a imagem real do apresentador
                alt="Apresentador 1"
                width={150}
                height={150}
                className="mx-auto rounded-full"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-900 md:text-xl">
                Luiz Victorino
              </h3>
              <p className="mt-2 text-gray-600">
                Especialista em estatísticas e analista de desempenho da NFL.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AudioPlayer
        exibePlayer={exibePlayer}
        setExibePlayer={setExibePlayer}
        title={episodioSelecionado}
      />

      {/* Footer */}
      <div className="rounded-b-lg bg-[#2b6d27] py-6 text-center text-white">
        <div className="container mx-auto">
          <p>&copy; 2024 NFL-ETC Podcast. Todos os direitos reservados.</p>
        </div>
      </div>
      {/* Footer */}
    </div>
  )
}

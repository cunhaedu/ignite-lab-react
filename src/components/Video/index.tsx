import { gql, useQuery } from '@apollo/client';
import { DefaultUi, Player, Youtube } from '@vime/react';
import { DiscordLogo, FileArrowDown, Lightning, CaretRight } from 'phosphor-react';

type VideoProps = {
  lessonSlug: string;
}

const GET_LESSON_BY_SLUG_QUERY = gql`
  query Lesson ($slug: String) {
    lesson(where: {slug: $slug}) {
      title
      videoId
      description
      teacher {
        avatarURL
        bio
        name
      }
    }
  }
`

type GetLessonBySlugResponse = {
  lesson: {
    title: string;
    videoId: string;
    description: string;
    teacher: {
      name: string;
      bio: string;
      avatarURL: string;
    }
  }
}

export function Video({ lessonSlug }: VideoProps) {
  const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: { slug: lessonSlug }
  })

  if (!data || !data.lesson) {
    return (
      <div className='flex-1'></div>
    )
  }

  return (
    <div className='flex-1 xl:max-h-[calc(100vh-3.5rem)] xl:overflow-y-scroll xl:scrollbar-none'>
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <section className='flex items-start gap-16 flex-col md:flex-row'>
          <div className='flex-1 '>
            <h1 className='text-2xl font-bold'>
              {data.lesson.title}
            </h1>

            <p className='mt-4 text-gray-200 leading-relaxed'>
              {data.lesson.description}
            </p>

            <div className='flex items-center gap-4 mt-6'>
              <img
                className='h-16 w-16 rounded-full border-2 border-blue-500'
                src={data.lesson.teacher.avatarURL}
                alt={data.lesson.teacher.name}
              />

              <div className='leading-relaxed'>
                <strong className='text-2xl block'>
                  {data.lesson.teacher.name}
                </strong>

                <span className='text-gray-200 text-sm block'>
                {data.lesson.teacher.bio}
                </span>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-4 w-full md:w-auto'>
            <a href="#" className='p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors'>
              <DiscordLogo size={24} />
              Comunidade no Discord
            </a>

            <a href="#" className='p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors'>
              <Lightning size={24} />
              Acesse o Desafio
            </a>
          </div>
        </section>

        <section className='gap-8 mt-20 grid grid-cols-1 md:grid-cols-2'>
          <a
            className='bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors'
            href="#"
          >
            <div className='bg-green-700 h-full p-6 flex items-center'>
              <FileArrowDown size={40} />
            </div>
            <div className='py-6 leading-relaxed'>
              <strong className='text-2xl'>Material complementar</strong>
              <p className='text-sm text-gray-200 mt-2'>
                Acesse o material complementar para acelerar o seu desenvolvimento
              </p>
            </div>
            <div className='h-full p-6 flex items-center'>
              <CaretRight size={24} />
            </div>
          </a>

          <a
            className='bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors'
            href="#"
          >
            <div className='bg-green-700 h-full p-6 flex items-center'>
              <FileArrowDown size={40} />
            </div>
            <div className='py-6 leading-relaxed'>
              <strong className='text-2xl'>Wallpapers Exclusivos</strong>
              <p className='text-sm text-gray-200 mt-2'>
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
              </p>
            </div>
            <div className='h-full p-6 flex items-center'>
              <CaretRight size={24} />
            </div>
          </a>
        </section>
      </div>
    </div>
  )
}

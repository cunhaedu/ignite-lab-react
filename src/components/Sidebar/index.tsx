import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { Lesson } from '../Lesson';

const GET_LESSONS_QUERY = gql`
  query {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      lessonType
      availableAt
      title
      slug
    }
  }
`

type GetLessonsQueryResponse = {
  lessons: Array<{
    id: string;
    lessonType: 'live' | 'class';
    availableAt: string;
    title: string;
    slug: string;
  }>
}

export function Sidebar() {
  const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY);

  return (
    <aside className='max-h-[calc(100vh-3.5rem)] hidden xl:block w-[21.75rem] bg-gray-700 p-6 border-l border-gray-600 scrollbar-thin scrollbar-thumb-gray-300'>
      <span className='font-bold text-2xl text-center pb-6 mb-6 border-b border-gray-500 block'>
        Cronograma de aulas
      </span>

      <section className='flex flex-col gap-8'>
        {data?.lessons.map(lesson => (
          <Lesson
            title={lesson.title}
            slug={lesson.slug}
            type={lesson.lessonType}
            availableAt={new Date(lesson.availableAt)}
            key={lesson.id}
          />
        ))}
      </section>
    </aside>
  )
}

import { useEffect } from 'react'
import { MessageCircle } from 'lucide-react'

import { useCurrentLesson, useStore } from '../zustand-store'

import { Header } from '../components/Header'
import { Video } from '../components/Video'
import { Module } from '../components/Module'

export function Player() {
  const { load, course } = useStore(store => {
    return {
      course: store.course,
      load: store.load,
    }
  })

  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo: ${currentLesson.title}`
    }
  }, [currentLesson])

  return (
    <div className='h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center'>
      <div className='flex w-[1100px] flex-col gap-6'>
        <div className='flex items-center justify-between'>
          <Header />

          <button className='flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600'>
            <MessageCircle className='w-4 h-4' />
            Deixar feedback
          </button>
        </div>

        <main className='relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 pr-80'>
          <div className='flex-1'>
            <Video />
          </div>

          <aside className='w-80 absolute top-0 bottom-0 right-0 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-auto scrollbar scrollbar-w-[4px] scrollbar-track-zinc-950 scrollbar-thumb-zinc-700'>
            {course?.modules && course?.modules.map((module, index) => {
              return (
                <Module
                  key={module.id}
                  moduleIndex={index}
                  title={module.title}
                  amountOfLessons={module.lessons.length}
                />
              )
            })}
          </aside>
        </main>
      </div>
    </div>
  )
}

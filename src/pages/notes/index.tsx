import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import { Plus, X } from 'lucide-react'

import prismadb from '../../lib/prismadb'
import { NoteProps } from '../../interfaces'

interface Props{
  notes: NoteProps[];
}

export default function NotePage({ notes }: Props) {
  const [createTitle, setCreateTitle] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const router = useRouter();

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: noteTitle }),
      });
      const responseData = await response.json()
      
      const newNoteId = responseData.id;

      router.push({
        pathname: `/notes/${newNoteId}`,
        query: { formData: responseData },
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <main className='p-4'>
      <div className='flex justify-between'>
        <h1 className='font-bold text-2xl text-blue-400 mb-4'>Your notes</h1>
        <button
          onClick={() => setCreateTitle((cur) => !cur)}
          className='flex gap-4 text-blue-400'
        >
          Add note
          <Plus />
        </button>
      </div>
      {createTitle ? (
        <div >
          <div className='w-64 flex flex-col bg-blue-300 p-8 rounded mt-4 mb-4'>
            <button>
              <X />
            </button>
              <input
                placeholder='Enter title'
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className='mt-4 p-2 rounded'
              />
              <button 
                onClick={handleCreate}
                className='bg-blue-500 text-white rounded mt-4'>
                Add
              </button>
            
          </div>
        </div>
      ) : null}
      <div>
        {notes.map((note) => (
           <Link 
             key={note.id}
             href={`/notes/${note.id}`}
             className='flex gap-2 text-2xl mt-4 mb-8'>
            <span className='text-blue-400'>●</span> {note.title}
          </Link>
        ))}
      </div>
    </main>
  );
}

export const getServerSideProps = withServerSideAuth(async ({ req, res }) => {
  const { userId } = req.auth

  if (!userId) {
    res.writeHead(302, { Location: '/sign-in' })
    res.end();
    return { props: {} }
  }

  const notes = await prismadb.note.findMany({
    where: {
      userId: userId as string,
    },
  })

  return{
    props:{
      notes: JSON.parse(JSON.stringify(notes))
    }
  }
})

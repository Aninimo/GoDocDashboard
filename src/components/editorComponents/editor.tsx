import { useState } from 'react'
import { useRouter } from 'next/router'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

import { MenuBar } from './menuBar'

interface EditorProps {
  noteId?: string;
  initialContent?: string;
}

export default function Editor({ noteId, initialContent }: EditorProps) {
  const [editorContent, setEditorContent] = useState(initialContent || '')
  const[loading,setLoading] = useState(false)

  const router = useRouter()
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
    ],
    autofocus: false,
    content: editorContent,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML())
    },
  })
  
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ noteId, content: editorContent }),
      })
    } catch (error) {
      alert(error)
    }
  };

  const onDelete = async () => {
  try {
    setLoading(true);
    const response = await fetch(`/api/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.push({
      pathname: `/notes`,
      
    });
  } catch (error) {
    alert(error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <div className='mt-8'>
        <MenuBar
          editor={editor}
        />
        <EditorContent 
          editor={editor} 
          className='p-4 border'/>
        <div className='flex justify-between'>
           <button 
             onClick={handleSave}
             className='bg-blue-500 text-white rounded p-2 px-12 mt-8'>
            Save
          </button>
          <button
            onClick={onDelete}
            className='bg-red-500 text-white rounded p-2 px-12 mt-8'>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

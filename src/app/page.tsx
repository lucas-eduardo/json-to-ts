'use client'

import { ClipboardDocumentIcon, TrashIcon } from '@heroicons/react/24/solid'
import Editor from '@monaco-editor/react'
import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState('')
  const [output, setOutput] = useState('')

  const handleConvert = async () => {
    const idToast = toast.loading('Aguarde, realizando a conversão...')

    try {
      setIsLoading(true)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URI_API}/convert`,
        {
          method: 'POST',
          body: JSON.stringify({ value }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const data = await response.json()

      setOutput(data.response)

      toast.success('Conversão concluída!')
    } catch (error) {
      toast.error(
        'Desculpe, algo deu errado. Por favor, tente novamente mais tarde.',
      )
    } finally {
      setIsLoading(false)

      toast.done(idToast)
    }
  }

  const copyToClipBoard = () => toast.success('Copiado.')

  const deleteValue = () => {
    setValue('')
    setOutput('')
  }

  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1 border-r-2 border-r-gray-700">
        <div className="flex items-center justify-between w-full h-16 bg-[#1e1e1e] border-b-2 border-b-gray-700 p-4">
          <h1 className="text-2xl font-semibold text-neutral-200">JSON</h1>

          <div className="grid grid-cols-2 gap-x-2">
            <button
              type="button"
              disabled={isLoading || !value}
              onClick={handleConvert}
              className="px-2 py-1 font-medium rounded outline-none shadow bg-emerald-700 text-slate-100 text-lg uppercase disabled:opacity-60 disabled:cursor-not-allowed"
            >
              CONVERTER
            </button>
            <button
              type="button"
              disabled={isLoading || !value}
              onClick={deleteValue}
              className="flex items-center justify-center bg-none px-2 py-1 font-medium rounded outline-none text-rose-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <TrashIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="h-[calc(100vh-64px)]">
          <Editor
            theme="vs-dark"
            defaultLanguage="json"
            defaultValue="{}"
            value={value}
            onChange={(value) => value && setValue(value)}
          />
        </div>
      </div>

      <div className="col-span-1">
        <div className="flex items-center justify-between w-full h-16 bg-[#1e1e1e] border-b-2 border-b-gray-700 p-4">
          <h1 className="text-2xl font-semibold text-neutral-200">
            Typescript
          </h1>

          <CopyToClipboard text={output} onCopy={copyToClipBoard}>
            <button className="cursor-pointer">
              <ClipboardDocumentIcon className="h-6 w-6 text-slate-100" />
            </button>
          </CopyToClipboard>
        </div>

        <div className="h-[calc(100vh-64px)]">
          <Editor
            theme="vs-dark"
            defaultLanguage="typescript"
            options={{ domReadOnly: true, readOnly: true }}
            defaultValue=""
            value={output}
            onChange={(value) => value && setOutput(value)}
          />
        </div>
      </div>
    </div>
  )
}

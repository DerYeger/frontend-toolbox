import React, { useEffect, useState } from 'react'
import { type UsersGetByUsername200Response } from './api/api-gen/github'
import { toast, Toaster } from 'sonner'
import { usersApi } from './api'

function App() {
  const [usernameInput, setUsernameInput] = useState('')

  const [submittedUsername, setSubmittedUsername] = useState<string>()

  if (!submittedUsername) {
    const submitDisabled = !usernameInput
    const buttonColorClasses = submitDisabled ? 'bg-neutral-500' : 'bg-blue-600'
    return (
      <Wrapper>
        <div className='flex gap-3 w-fit'>
          <input
            type='text'
            className='max-w-64 border border-neutral-600 rounded-sm px-2 py-1'
            value={usernameInput}
            onChange={(event) => setUsernameInput(event.target.value)}
            placeholder='Username'
          />
          <button
            className={`w-fit rounded-sm px-2 py-1 text-white ${buttonColorClasses}`}
            disabled={submitDisabled}
            onClick={() => setSubmittedUsername(usernameInput)}
          >
            Submit
          </button>
        </div>
      </Wrapper>
    )
  }

  console.log('submitted')

  return (
    <Wrapper>
      <UserInfo
        username={submittedUsername}
        onClear={() => setSubmittedUsername(undefined)}
      />
    </Wrapper>
  )
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col p-4 items-center justify-center w-full min-h-[100dvh]'>
      <Toaster />
      {children}
    </div>
  )
}

interface UserInfoProps {
  username: string
  onClear: () => void
}

function UserInfo({ username, onClear }: UserInfoProps) {
  const [user, setUser] = useState<UsersGetByUsername200Response>()

  useEffect(() => {
    const fetchAndSetUser = async () => {
      try {
        const response = await usersApi.usersGetByUsername(username)
        setUser(response.data)
      } catch (error) {
        toast(`Unable to load user ${username} (${error})`)
        onClear()
      }
    }
    fetchAndSetUser()
  }, [onClear, username])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <div className='font-bold'>{username}</div>
        <button
          className='border border-neutral-600 rounded-sm px-2 py-1'
          onClick={onClear}
        >
          Close
        </button>
      </div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

export default App

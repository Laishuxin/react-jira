import React, { FormEvent, Fragment } from 'react'
import { useAuth } from 'context/auth-context'

export const LoginScreen = () => {
  const { login } = useAuth()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const currentTarget = e.currentTarget
    const username = (currentTarget[0] as HTMLInputElement).value
    const password = (currentTarget[1] as HTMLInputElement).value
    login({ username, password })
  }

  return (
    <Fragment>
      <form onSubmit={e => handleSubmit(e)}>
        <div className='form-item'>
          <label htmlFor='username'>username</label>
          <input type='text' id={'username'} />
        </div>
        <div className='form-item'>
          <label htmlFor='password'>password</label>
          <input type='password' id='password' />
        </div>
        <button type='submit'>login</button>
      </form>
    </Fragment>
  )
}
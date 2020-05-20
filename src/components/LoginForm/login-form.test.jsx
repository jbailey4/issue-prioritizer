import React from 'react'
import LoginForm from '.'
import { render, fireEvent } from '@testing-library/react'

describe('<LoginForm /> spec', () => {
  test('it should show error message if invalid API key is submitted', async () => {
    const { findByText, getByTestId } = render(<LoginForm />)

    fireEvent.submit(getByTestId('login-form'))

    const errorMessage = await findByText(
      'Please enter a valid Github API Key.'
    )

    expect(errorMessage).toBeInTheDocument()
  })

  test('it should call didLogin prop with the provided API key', async () => {
    const handleLogin = (apiKey) => {
      expect(apiKey).toEqual('123456789')
    }
    const { getByTestId } = render(<LoginForm didLogin={handleLogin} />)

    fireEvent.change(getByTestId('api-key-input'), {
      target: { value: '123456789' },
    })
    fireEvent.submit(getByTestId('login-form'))
  })
})

import React from 'react'
import Header from '.'
import { render } from '@testing-library/react'

describe('<Header /> spec', () => {
  test('renders the component correctly', () => {
    const container = render(<Header />)
    expect(container).toMatchSnapshot()
  })
})

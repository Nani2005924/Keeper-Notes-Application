/** @vitest-environment jsdom */
import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddNotes from '../AddNotes'
import { afterEach, describe, expect, test, vi } from 'vitest'

afterEach(() => {
  cleanup()
})

describe('AddNotes validation', () => {
  test('alerts when title or content is empty', async () => {
    const user = userEvent.setup()
    const setFullNotes = vi.fn()
    vi.stubGlobal('alert', vi.fn())

    render(React.createElement(AddNotes, { FullNotes: [], setFullNotes }))

    // Try submit with both empty
    await user.click(screen.getByRole('button', { name: /add/i }))
    expect(window.alert).toHaveBeenCalledWith('Title and content should be filled')
    expect(setFullNotes).not.toHaveBeenCalled()

    // Fill only title
    await user.type(screen.getByPlaceholderText(/Title/i), 'Only title')
    await user.click(screen.getByRole('button', { name: /add/i }))
    expect(window.alert).toHaveBeenCalledWith('Title and content should be filled')
    expect(setFullNotes).not.toHaveBeenCalled()
  })

  test('alerts when title is not unique', async () => {
    const user = userEvent.setup()
    const existing = [{id: '1', title: 'Hello', content: 'x'}]
    const setFullNotes = vi.fn()
    vi.stubGlobal('alert', vi.fn())

    render(React.createElement(AddNotes, { FullNotes: existing, setFullNotes }))

    await user.type(screen.getByPlaceholderText(/Title/i), 'Hello')
    await user.type(screen.getByPlaceholderText(/Details/i), 'New content')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(window.alert).toHaveBeenCalledWith('Title must be unique')
    expect(setFullNotes).not.toHaveBeenCalled()
  })

  test('calls setFullNotes when valid', async () => {
    const user = userEvent.setup()
    const setFullNotes = vi.fn()
    render(React.createElement(AddNotes, { FullNotes: [], setFullNotes }))

    await user.type(screen.getByPlaceholderText(/Title/i), 'New title')
    await user.type(screen.getByPlaceholderText(/Details/i), 'Some content')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(setFullNotes).toHaveBeenCalled()
    const arg = setFullNotes.mock.calls[0][0]
    // confirm new note added
    expect(Array.isArray(arg)).toBeTruthy()
    expect(arg[arg.length-1].title).toBe('New title')
  })
})

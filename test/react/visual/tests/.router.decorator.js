import React from 'react'
import {MemoryRouter} from 'react-router'

export default (renderFn) => () => <MemoryRouter>{renderFn}</MemoryRouter>

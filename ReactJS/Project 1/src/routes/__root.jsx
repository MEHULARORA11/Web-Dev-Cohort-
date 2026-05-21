import * as React from 'react'
import { Outlet, createRootRoute,Link } from '@tanstack/react-router'
import NotFound from '../../components/NotFound.jsx'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
})

function RootComponent() {
  return (
    <React.Fragment>
      <h3>Welcome to My Mini React-Tanstack Project , u can Navigate using the links below</h3>
      <nav>
        <ul>
          <li style = {{display:'inline-block', margin:'0 10px'}} ><Link to="/">Home</Link></li>
        </ul>
      </nav>
      <Outlet />
    </React.Fragment>
  )
}

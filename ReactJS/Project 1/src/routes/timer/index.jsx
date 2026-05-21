import React from 'react'
import { createFileRoute,Link } from '@tanstack/react-router'
import TimerStopwatch from '../../../components/TimerStopwatch.jsx'

export const Route = createFileRoute('/timer/')({
    component: RouteComponent
})

 function RouteComponent() {
return (
  <TimerStopwatch/>
)
}



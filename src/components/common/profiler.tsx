import React, {
  Profiler as ReactProfiler,
  ProfilerProps,
  ProfilerOnRenderCallback,
} from 'react'

type IProfilerProps = {
  metadata?: any
  phases?: ('mount' | 'update')[]
} & Omit<ProfilerProps, 'onRender'>

let queue: unknown[] = []
const sendProfilerQueue = () => {
  if (queue.length === 0) {
    return
  }
  const queueToSend = [...queue]
  queue = []
  console.log(queueToSend)
}

// setInterval(sendProfilerQueue, 5000)

export const Profiler = ({
  metadata,
  phases,
  ...restProps
}: IProfilerProps) => {
  const onRender: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    startTime,
    commitTime,
    interactions,
  ) => {
    if (!phases || phases.includes(phase)) {
      queue.push({
        id,
        phase,
        actualDuration,
        startTime,
        commitTime,
        interactions,
        metadata,
      })
    }
  }

  return <ReactProfiler onRender={onRender} {...restProps} />
}

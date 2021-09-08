import React, { Fragment } from 'react'

interface IMarkProps {
  name: string
  keyword?: string
}

export const Mark = ({ name, keyword }: IMarkProps) => {
  if (!keyword) return <>{name}</>

  const nameArr = name.split(keyword)
  return (
    <>
      {nameArr.map((str, index) => (
        <Fragment key={index}>
          {str}
          {index === nameArr.length - 1 ? null : (
            <span style={{ color: '#246AFD' }}>{keyword}</span>
          )}
        </Fragment>
      ))}
    </>
  )
}

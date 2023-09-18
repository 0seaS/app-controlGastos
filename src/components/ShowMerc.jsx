import React, { useEffect, useState } from 'react'
import useFetchMerc from '../Hooks/useFetchMerc'

const ShowMerc = () => {

    const {data, getData} = useFetchMerc()

    useEffect(() => {
      getData()
    }, [])

    console.log(data)
  return (
    <div>ShowMerc</div>
  )
}

export default ShowMerc
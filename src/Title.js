import React, { useEffect } from 'react'

const Title = props => {

    useEffect(() => {
        document.title = props.title;
    },[])

    return (
        <></>
    )
}

export default Title
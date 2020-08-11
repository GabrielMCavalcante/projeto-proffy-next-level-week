import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function Landing() {
    
    const [authenticated] = useState(false)
    const history = useHistory()
    debugger
    if(authenticated) history.replace('/menu')
    else history.replace('/auth')    

    return <></>
}

export default Landing
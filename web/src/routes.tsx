import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// Pages
import Landing from 'pages/Landing'
import Menu from 'pages/Menu' 
import TeacherList from 'pages/TeacherList'
import TeacherForm from 'pages/TeacherForm'
import Register from 'pages/Register'

function Routes() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Landing} />
            <Route path="/auth" component={Register}/>
            <Route path="/menu" component={Menu} />
            <Route path="/study" component={TeacherList} />
            <Route path="/teach" component={TeacherForm} />
        </BrowserRouter>
    )
}

export default Routes
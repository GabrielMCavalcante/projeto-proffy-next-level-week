import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// Pages
import Landing from 'pages/Landing'
import TeacherList from 'pages/TeacherList'
import TeacherForm from 'pages/TeacherForm'

function Routes() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Landing} />
            <Route path="/study" component={TeacherList}/>
            <Route path="/teach" component={TeacherForm}/>
        </BrowserRouter>
    )
}

export default Routes
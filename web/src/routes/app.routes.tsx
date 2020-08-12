import React from 'routes/node_modules/react'
import { Route, Redirect } from 'routes/node_modules/react-router-dom'

// Pages
import Menu from 'pages/Menu' 
import TeacherList from 'pages/TeacherList'
import TeacherForm from 'pages/TeacherForm'

function AppRoutes() {
    return (
        <>
            <Route path="/menu" component={Menu} />
            <Route path="/study" component={TeacherList} />
            <Route path="/teach" component={TeacherForm} />
            <Redirect to="/menu"/>
        </>
    )
}

export default AppRoutes
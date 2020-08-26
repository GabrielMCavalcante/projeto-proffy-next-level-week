import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

// Pages
import Menu from 'pages/Menu' 
import Profile from 'pages/Profile'
import TeacherList from 'pages/TeacherList'
import TeacherForm from 'pages/TeacherForm'

function AppRoutes() {
    return (
        <Switch>
            <Route path="/menu" component={Menu} />
            <Route path="/profile" component={Profile} />
            <Route path="/study" component={TeacherList} />
            <Route path="/teach" component={TeacherForm} />
            <Redirect to="/menu"/>
        </Switch>
    )
}

export default AppRoutes
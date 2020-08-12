import React from 'routes/node_modules/react'
import { Route, Switch, Redirect } from 'routes/node_modules/react-router-dom'

// Pages
import Register from 'pages/Register'

function AuthRoutes() {
    return (
        <Switch>
            <Route path="/auth" component={Register} />
            <Redirect to="/auth" />
        </Switch>
    )
}

export default AuthRoutes
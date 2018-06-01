import React from 'react'
import { Link, Route } from 'react-router-dom'
import { Menu } from 'nami'

export default function MenuItemLink({ to, exact, ...rest }: { to: string; exact?: boolean }) {
    return (
        <Route
            path={to}
            exact={exact}
            children={({ match }) => (
                <Menu.Item active={!!match}>
                    <Link to={to} {...rest} />
                </Menu.Item>
            )}
        />
    )
}

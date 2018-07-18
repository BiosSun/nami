import React, { ReactNode } from 'react'
import { Link, Route } from 'react-router-dom'
import { Menu } from 'nami'

export default function MenuItemLink({
    to,
    exact,
    children,
    ...otherProps
}: {
    to: string
    exact?: boolean
    children: ReactNode
}) {
    return (
        <Route
            path={to}
            exact={exact}
            children={({ match }) => (
                <Menu.Item active={!!match} {...otherProps}>
                    <Link to={to}>{children}</Link>
                </Menu.Item>
            )}
        />
    )
}

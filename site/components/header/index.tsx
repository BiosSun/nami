import React, { Component } from 'react'
import classnames from 'classnames'
import { RouteComponentProps } from 'react-router-dom'
import { Navbar, Menu, Icon, Space } from 'nami'

import Logo from '@site/components/logo'
import MenuItemLink from '@site/components/menu-item-link'
import { DocsIndexContext } from '@site/components/contexts'

import './index.scss'

export interface HeaderProps extends RouteComponentProps<{}, {}> {}

export default class Header extends Component<HeaderProps> {
    render() {
        const classes = classnames('app-header', {
            'app-header--borderless': this.props.location.pathname === '/',
        })

        return (
            <DocsIndexContext.Consumer>
                {({ lang }) => (
                    <Navbar className={classes}>
                        <Navbar.Brand>
                            <Logo />
                        </Navbar.Brand>

                        <Menu>
                            <MenuItemLink to="/" exact>
                                {lang.home}
                            </MenuItemLink>
                            <MenuItemLink to="/documents">{lang.documents}</MenuItemLink>

                            <Space $flex />

                            <Menu.Item>
                                <a href="https://github.com/biossun/nami" target="_blank">
                                    <Icon className="mr-xs" name="github" />
                                    {lang.github}
                                </a>
                            </Menu.Item>
                        </Menu>
                    </Navbar>
                )}
            </DocsIndexContext.Consumer>
        )
    }
}

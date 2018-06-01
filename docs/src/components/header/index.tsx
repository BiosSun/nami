import React, { Component } from 'react'
import classnames from 'classnames'
import { RouteComponentProps } from 'react-router-dom'
import { Navbar, Menu, Icon } from 'nami'

import Logo from '@docs/components/logo'
import MenuItemLink from '@docs/components/menu-item-link'

import './index.scss'

export interface HeaderProps extends RouteComponentProps<{}, {}> {}
export interface HeaderState {}

export default class Header extends Component<HeaderProps, HeaderProps> {
    render() {
        const classes = classnames('app-header', {
            'app-header--borderless': this.props.location.pathname === '/',
        })

        return (
            <Navbar className={classes}>
                <Navbar.Brand>
                    <Logo />
                </Navbar.Brand>

                <Menu>
                    <MenuItemLink to="/" exact>
                        首页
                    </MenuItemLink>
                    <MenuItemLink to="/documents">文档</MenuItemLink>
                    <MenuItemLink to="/about">关于</MenuItemLink>

                    <Menu.FlexibleSpace />

                    <Menu.Item className="app-version-menu-item">
                        <code>v3.x</code>
                        <Menu>
                            <Menu.Item>
                                <a href="/versions/v3">
                                    <code>v3.x</code>
                                </a>
                            </Menu.Item>
                            <Menu.Item>
                                <a href="/versions/v2">
                                    <code>v2.x</code>
                                </a>
                            </Menu.Item>
                        </Menu>
                    </Menu.Item>
                    <Menu.Item>
                        <a href="https://github.com/biossun/nami" target="_blank">
                            <Icon name="github" />
                            GitHub
                        </a>
                    </Menu.Item>
                </Menu>
            </Navbar>
        )
    }
}

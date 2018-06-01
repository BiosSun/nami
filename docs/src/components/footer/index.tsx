import React, { Component } from 'react'

import './index.scss'

export interface FooterProps {}
export interface FooterState {}

export default class Footer extends Component<FooterProps, FooterProps> {
    render() {
        return (
            <div className="app-footer">
                {/*
                Designed and built by <a href="http://biossun.org" target="_blank">Bios Sun</a>, 
                the design is inspired by <a href="https://www.youtube.com/embed/j0xbX5ivgdA?autoplay=1" target="_blank">snow from Hokkaido</a>, 
                and the name comes from the character of the same name in the <a href="https://one-piece.com/" target="_blank">One Piece</a> Comics.
                <br />
                
                Code licensed <a href="https://github.com/biossun/nami/blob/master/LICENSE" target="_blank">MIT</a>, 
                docs <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank">CC BY 3.0</a>.
                */}

                <div style={{ textAlign: 'center' }}>
                    该项目由{' '}
                    <a href="http://biossun.org" target="_blank">
                        Bios Sun
                    </a>{' '}
                    设计、开发及维护，其设计灵感来自我无比钟爱的{' '}
                    <a href="https://www.youtube.com/embed/j0xbX5ivgdA?autoplay=1" target="_blank">
                        北海道的雪
                    </a>，而名字来自{' '}
                    <a href="https://one-piece.com/" target="_blank">
                        海贼王
                    </a>{' '}
                    漫画中的同名角色；
                    <br />
                    项目代码遵循{' '}
                    <a href="https://github.com/biossun/nami/blob/master/LICENSE" target="_blank">
                        MIT 开源协议
                    </a>{' '}
                    ，网站内容遵循{' '}
                    <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank">
                        知识共享协议 CC BY 3.0
                    </a>。
                </div>
            </div>
        )
    }
}

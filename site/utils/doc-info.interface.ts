export interface DocInfo {
    name: string
    displayName: string
    text: string

    demos: {
        [id: string]: DocDemoInfo
    }
}

export interface DocDemoInfo {
    name: string
}

import React from 'react'

import { action } from '@storybook/addon-actions'
import { Button } from '@biossun/nami'

export default {
    title: 'Button',
    component: Button,
}

export const Text = () => <Button onClick={action('clicked')}>按钮</Button>

export const Emoji = () => (
    <Button onClick={action('clicked')}>
        <span role="img" aria-label="so cool">
            😀 😎 👍 💯
        </span>
    </Button>
)

Emoji.story = {
    name: 'with emoji',
}

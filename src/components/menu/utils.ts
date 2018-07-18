export type RootMenuMode = 'horizontal' | 'vertical'
export type SubMenuMode = 'vertical' | 'popover'
export type MenuMode = RootMenuMode | SubMenuMode

/**
 * 根据当前菜单的展示模式获取其子菜单展示模式
 */
export enum SubMenuModeEnum {
    vertical = 'vertical',
    horizontal = 'popover',
    popover = 'popover',
}

/**
 * 根据菜单的展示模式来获取其对应的布局方向
 */
export enum DirectionEnum {
    horizontal = 'horizontal',
    vertical = 'vertical',
    popover = 'vertical',
}

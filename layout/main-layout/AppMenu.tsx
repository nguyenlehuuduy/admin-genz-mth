/* eslint-disable @next/next/no-img-element */

import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from '../context/menucontext';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const model: AppMenuItem[] = [
        {
            label: 'Quản lí',
            items: [
                {
                    label: 'bài viết',
                    icon: 'pi pi-fw pi-list',
                    items: [
                        { label: 'danh sách bài viết', icon: 'pi pi-fw pi-bookmark', to: '/new-feeds' },
                        { label: 'tạo bài viết', icon: 'pi pi-fw pi-bookmark', to: '/new-feeds/create' }
                    ]
                },
                {
                    label: 'quyền bài viết',
                    icon: 'pi pi-fw pi-list',
                    items: [
                        { label: 'danh sách quyền bài viết', icon: 'pi pi-fw pi-bookmark', to: '/permission-post' },
                        { label: 'tạo quyền bài viết', icon: 'pi pi-fw pi-bookmark', to: '/permission-post/create' }
                    ]
                },
                {
                    label: 'role (quyền)',
                    icon: 'pi pi-fw pi-list',
                    items: [
                        { label: 'danh sách quyền', icon: 'pi pi-fw pi-bookmark', to: '/roles' },
                        { label: 'tạo quyền', icon: 'pi pi-fw pi-bookmark', to: '/roles/create' }
                    ]
                },
                {
                    label: 'Tab Menu',
                    icon: 'pi pi-fw pi-list',
                    items: [
                        { label: 'Danh sách Tab Menu', icon: 'pi pi-fw pi-bookmark', to: '/tab-menu' },
                        { label: 'Tạo Tab Menu', icon: 'pi pi-fw pi-bookmark', to: '/tab-menu/create' }
                    ]
                },
                {
                    label: 'feature',
                    icon: 'pi pi-fw pi-list',
                    items: [
                        { label: 'danh sách feature', icon: 'pi pi-fw pi-bookmark', to: '/features' },
                        { label: 'tạo feature', icon: 'pi pi-fw pi-bookmark', to: '/features/create' }
                    ]
                },
                {
                    label: 'type-message',
                    icon: 'pi pi-fw pi-list',
                    items: [
                        { label: 'danh sách type-message', icon: 'pi pi-fw pi-bookmark', to: '/type-message' },
                        { label: 'tạo type-message', icon: 'pi pi-fw pi-bookmark', to: '/type-message/create' }
                    ]
                },
                {
                    label: 'Hot content',
                    icon: 'pi pi-fw pi-list',
                    items: [
                        { label: 'Danh sách hotcontent', icon: 'pi pi-fw pi-bookmark', to: '/hot-content' },
                        { label: 'Tạo content', icon: 'pi pi-fw pi-bookmark', to: '/hot-content/create' }
                    ]
                },
                {
                    label: 'Notification',
                    icon: 'pi pi-fw pi-list',
                    items: [
                        { label: 'Danh sách thông báo từ admin', icon: 'pi pi-fw pi-bookmark', to: '/notifications' },
                        { label: 'Tạo thông báo', icon: 'pi pi-fw pi-bookmark', to: '/notifications/create' }
                    ]
                },
                {
                    label: 'loại thông báo',
                    icon: 'pi pi-fw pi-list',
                    items: [
                        { label: 'Danh sách loại thông báo', icon: 'pi pi-fw pi-bookmark', to: '/type-notifications' },
                        { label: 'Tạo loại thông báo', icon: 'pi pi-fw pi-bookmark', to: '/type-notifications/create' }
                    ]
                },
                {
                    label: 'loại ảnh',
                    icon: 'pi pi-fw pi-list',
                    items: [
                        { label: 'Danh sách các loại ảnh được lưu', icon: 'pi pi-fw pi-bookmark', to: '/type-images' },
                        { label: 'Tạo một loại ảnh', icon: 'pi pi-fw pi-bookmark', to: '/type-images/create' }
                    ]
                },
                {
                    label: 'Favorite tag',
                    icon: 'pi pi-fw pi-list',
                    items: [
                        { label: 'Danh sách các favorite tag', icon: 'pi pi-fw pi-bookmark', to: '/favorite-tag' },
                        { label: 'Tạo một favorite tag', icon: 'pi pi-fw pi-bookmark', to: '/favorite-tag/create' }
                    ]
                }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;

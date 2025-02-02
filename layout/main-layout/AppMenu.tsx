/* eslint-disable @next/next/no-img-element */

import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from '../context/menucontext';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const model: AppMenuItem[] = [
        {
            label: 'Quản lí',
            items: [{
                label: 'bài viết', icon: 'pi pi-fw pi-list',
                items: [
                    { label: 'danh sách bài viết', icon: 'pi pi-fw pi-bookmark', to: '/new-feeds' },
                    { label: 'tạo bài viết', icon: 'pi pi-fw pi-bookmark', to: '/new-feeds/create' },
                ]
            }]
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

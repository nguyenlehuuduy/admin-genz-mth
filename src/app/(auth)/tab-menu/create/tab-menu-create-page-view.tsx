'use client';

import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { useState } from 'react';
import LoadingBlockUI from '../../component/loading-block-ui';
import { useSessionStorage } from 'primereact/hooks';
import { useRouter } from 'next/navigation';
import { tabMenuCreate } from '@/src/app/api/services/tabMenuService';

type PropsComponent = {};

type FormikType = {
    name: string;
    iconUrl: string;
    url: string;
};

type Errorkeys = 'name' | 'iconUrl' | 'url';

export default function CreateTabMenuPageView(props: PropsComponent) {
    const [loading, setLoading] = useState<boolean>(false);
    const [, setResultMessage] = useSessionStorage('', 'result-message');
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            name: '',
            iconUrl: '',
            url: ''
        },
        validate: (data: FormikType) => {
            const errors: {
                name?: string;
                iconUrl?: string;
                url?: string;
            } = {};
            if (!data.name) {
                errors.name = 'Chưa nhập tên Tab Menu';
            }
            if (!data.iconUrl) {
                errors.iconUrl = 'Chưa nhập Icon Url';
            }
            if (!data.url) {
                errors.url = 'Chưa nhập Url';
            }
            return errors;
        },
        onSubmit: async (data: FormikType) => {
            setLoading(true);
            await tabMenuCreate({
                name: data.name,
                iconUrl: data.iconUrl,
                url: data.url
            }).then((rs) => {
                if (rs) {
                    setResultMessage('Tạo mới một Tab Menu thành công');
                    router.replace('/tab-menu');
                }
            });
            setLoading(false);
        }
    });

    const handleErrorValidate = (key: Errorkeys) => {
        return !!(formik.touched[key] && formik.errors[key]);
    };

    const errorFormMessage = (key: Errorkeys, condition?: boolean, className?: string, style?: React.CSSProperties) => {
        return <div>{condition && <Message severity="error" text={String(formik.errors[key])} className={className} style={style} />}</div>;
    };

    return (
        <div className="card p-fluid">
            <LoadingBlockUI visible={loading} />
            <form onSubmit={formik.handleSubmit}>
                <h5>Tạo Tab Menu mới </h5>
                <div className="field">
                    <label htmlFor="name">Tên Tab Menu</label>
                    <InputText className={`${handleErrorValidate('name') && 'p-invalid'}`} id="name" type="text" value={formik.values.name} onChange={(e) => formik.setFieldValue('name', e.target.value)} />
                    <div>{errorFormMessage('name', handleErrorValidate('name'))}</div>
                </div>
                <div className="field">
                    <label htmlFor="desRole">Icon Url</label>
                    <InputText className={`${handleErrorValidate('iconUrl') && 'p-invalid'}`} id="desThFn" type="text" value={formik.values.iconUrl} onChange={(e) => formik.setFieldValue('iconUrl', e.target.value)} />
                    <div>{errorFormMessage('iconUrl', handleErrorValidate('iconUrl'))}</div>
                </div>
                <div className="field">
                    <label htmlFor="desRole">Đường dẫn</label>
                    <InputText className={`${handleErrorValidate('url') && 'p-invalid'}`} id="url" type="text" value={formik.values.url} onChange={(e) => formik.setFieldValue('url', e.target.value)} />
                    <div>{errorFormMessage('url', handleErrorValidate('url'))}</div>
                </div>
                <Button label="Tạo" severity="success" type="submit" />
            </form>
        </div>
    );
}

'use client';

import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { useState } from 'react';
import LoadingBlockUI from '../../component/loading-block-ui';
import { useSessionStorage } from 'primereact/hooks';
import { useRouter } from 'next/navigation';
import { postPermissionPost } from '@/src/app/api/services/permissionPostService';

type PropsComponent = {};

type FormikType = {
    idPermission: string;
    code: string;
    description: string;
};

type Errorkeys = 'code' | 'description' | 'idPermission';

export default function CreatePermissionPostPageView(props: PropsComponent) {
    const [loading, setLoading] = useState<boolean>(false);
    const [, setResultMessage] = useSessionStorage('', 'result-message');
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            idPermission: '',
            code: '',
            description: ''
        },
        validate: (data: FormikType) => {
            const errors: {
                idPermission?: string;
                code?: string;
                description?: string;
            } = {};
            if (!data.code) {
                errors.code = 'chưa nhập tên quyền';
            }
            if (!data.description) {
                errors.description = 'chưa nhập mô tả quyền này';
            }
            if (!data.idPermission) {
                errors.idPermission = 'chưa nhập id cho quyền này';
            }
            return errors;
        },
        onSubmit: async (data: FormikType) => {
            setLoading(true);
            await postPermissionPost({
                id: data.idPermission,
                code: data.code,
                description: data.description
            }).then((rs) => {
                if (rs) {
                    setResultMessage('Tạo mới một quyền thành công');
                    router.replace('/permission-post');
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
                <h5>Tạo Permission Post</h5>
                <div className="field">
                    <label htmlFor="idPermission">ID quyền</label>
                    <InputText className={`${handleErrorValidate('idPermission') && 'p-invalid'}`} id="id" type="text" value={formik.values.idPermission} onChange={(e) => formik.setFieldValue('idPermission', e.target.value)} />
                    <div>{errorFormMessage('idPermission', handleErrorValidate('idPermission'))}</div>
                </div>
                <div className="field">
                    <label htmlFor="title">Tên Quyền</label>
                    <InputText className={`${handleErrorValidate('code') && 'p-invalid'}`} id="code" type="text" value={formik.values.code} onChange={(e) => formik.setFieldValue('code', e.target.value)} />
                    <div>{errorFormMessage('code', handleErrorValidate('code'))}</div>
                </div>
                <div className="field">
                    <label htmlFor="description">Mô tả</label>
                    <InputText className={`${handleErrorValidate('description') && 'p-invalid'}`} id="description" type="text" value={formik.values.description} onChange={(e) => formik.setFieldValue('description', e.target.value)} />
                    <div>{errorFormMessage('description', handleErrorValidate('description'))}</div>
                </div>
                <Button label="tạo" severity="success" type="submit" />
            </form>
        </div>
    );
}

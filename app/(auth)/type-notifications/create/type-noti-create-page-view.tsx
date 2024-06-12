'use client';

import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { useEffect, useState } from 'react';
import LoadingBlockUI from '../../component/loading-block-ui';
import { useSessionStorage } from 'primereact/hooks';
import { useRouter } from 'next/navigation';
import { postTypeNotification } from '@/app/api/services/typeNotificationService';
import type { Demo } from '@/types';
import { MyIcon, getAllIconLocal } from '@/demo/service/_iconService';
import { Image } from 'primereact/image';

type FormikType = {
    typeName: string;
    description: string;
    thumbnailNoti: string;
};

type Errorkeys = 'typeName' | 'description' | 'thumbnailNoti';

export default function CreateTypeNotificationPageView() {
    const [filteredIcons, setFilteredIcons] = useState<MyIcon[]>([]);
    useEffect(() => {
        getAllIconLocal.getIcons().then((data) => setFilteredIcons(data));
    }, []);

    const [loading, setLoading] = useState<boolean>(false);
    const [, setResultMessage] = useSessionStorage('', 'result-message');
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            typeName: '',
            description: '',
            thumbnailNoti: ''
        },
        validate: (data: FormikType) => {
            const errors: {
                typeName?: string;
                description?: string;
                thumbnailNoti?: string;
            } = {};
            if (!data.typeName) {
                errors.typeName = 'chưa nhập tên loại';
            }
            if (!data.description) {
                errors.description = 'chưa nhập mô tả';
            }
            if (!data.thumbnailNoti) {
                errors.thumbnailNoti = 'chưa chọn icon';
            }

            return errors;
        },
        onSubmit: async (data: FormikType) => {
            setLoading(true);
            await postTypeNotification({
                typeName: data.typeName,
                description: data.description,
                thumbnailNoti: '/' + data.thumbnailNoti
            }).then((rs) => {
                if (rs) {
                    setResultMessage('Tạo mới một loại thông báo thành công');
                    router.replace('/type-notifications');
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
                <h5>Tạo type-message (Type Message)</h5>
                <div className="field">
                    <label htmlFor="nameTypeMessage">Tên loại</label>
                    <InputText className={`${handleErrorValidate('typeName') && 'p-invalid'}`} id="typeName" type="text" value={formik.values.typeName} onChange={(e) => formik.setFieldValue('typeName', e.target.value)} />
                    <div>{errorFormMessage('typeName', handleErrorValidate('typeName'))}</div>
                </div>
                <div className="field">
                    <label htmlFor="descriptionTypeMessage">Mô tả</label>
                    <InputText className={`${handleErrorValidate('description') && 'p-invalid'}`} id="description" type="text" value={formik.values.description} onChange={(e) => formik.setFieldValue('description', e.target.value)} />
                    <div>{errorFormMessage('description', handleErrorValidate('description'))}</div>
                </div>
                <div className="field">
                    <label htmlFor="descriptionTypeMessage">Icon thông báo</label>
                    <InputText className={`${handleErrorValidate('thumbnailNoti') && 'p-invalid'}`} id="thumbnailNoti" type="text" value={formik.values.thumbnailNoti} onChange={(e) => formik.setFieldValue('thumbnailNoti', e.target.value)} />
                    <div>{errorFormMessage('thumbnailNoti', handleErrorValidate('thumbnailNoti'))}</div>
                </div>
                <Button label="tạo" severity="success" type="submit" />
            </form>

            <div className="grid icons-list text-center mt-5">
                {filteredIcons &&
                    filteredIcons.map((iconMeta, index) => {

                        return (
                            <div
                                className="col-6 sm:col-4 lg:col-3 xl:col-2 pb-5 cursor-pointer"
                                key={index}
                                onClick={() => formik.setFieldValue('thumbnailNoti', iconMeta?.name)}>
                                <Image src={iconMeta.path} alt='icon-main' />
                                <div>{iconMeta?.name}</div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

'use client';

import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import LoadingBlockUI from '../../component/loading-block-ui';
import { useSessionStorage } from 'primereact/hooks';
import { useRouter } from 'next/navigation';
import { postTypeImage } from '@/app/api/services/typeImageService';
import { Message } from 'primereact/message';

type PropsComponent = {};

type FormikType = {
    nameTypeImage: string;
    id: string;
};

type Errorkeys = 'nameTypeImage' | 'id';

export default function CreateTypeImagePageView(props: PropsComponent) {
    const [loading, setLoading] = useState<boolean>(false);
    const [, setResultMessage] = useSessionStorage('', 'result-message');
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            nameTypeImage: '',
            id: ''
        },
        validate: (data: FormikType) => {
            const errors: {
                nameTypeImage?: string;
                id?: string;
            } = {};
            if (!data.nameTypeImage) {
                errors.nameTypeImage = 'chưa nhập loại hình ảnh';
            }
            if (!data.id) {
                errors.id = 'chưa nhập id cho loại hình ảnh này';
            }
            return errors;
        },
        onSubmit: async (data: FormikType) => {
            setLoading(true);
            await postTypeImage({
                id: data.id,
                typeImageName: data.nameTypeImage
            }).then((rs) => {
                if (rs) {
                    setResultMessage('Tạo mới một loại hình ảnh thành công');
                    router.replace('/type-images');
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
                <h5>Tạo loại hình ảnh (Type Message)</h5>
                <div className="field">
                    <label htmlFor="nameTypeImage">id</label>
                    <InputText className={`${handleErrorValidate('id') && 'p-invalid'}`} id="id" type="text" value={formik.values.id} onChange={(e) => formik.setFieldValue('id', e.target.value)} />
                    <div>{errorFormMessage('id', handleErrorValidate('id'))}</div>
                </div>
                <div className="field">
                    <label htmlFor="nameTypeImage">Tên loại</label>
                    <InputText className={`${handleErrorValidate('nameTypeImage') && 'p-invalid'}`} id="nameTypeImage" type="text" value={formik.values.nameTypeImage} onChange={(e) => formik.setFieldValue('nameTypeImage', e.target.value)} />
                    <div>{errorFormMessage('nameTypeImage', handleErrorValidate('nameTypeImage'))}</div>
                </div>
                <Button label="tạo" severity="success" type="submit" />
            </form>
        </div>
    );
}

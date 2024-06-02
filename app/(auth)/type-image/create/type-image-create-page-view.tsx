'use client';

import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { useState } from 'react';
import LoadingBlockUI from '../../component/loading-block-ui';
import { useSessionStorage } from 'primereact/hooks';
import { useRouter } from 'next/navigation';
import { typeImageCreate } from '@/app/api/services/typeImageService';

type PropsComponent = {};

type FormikType = {
    typeImageName: string;
};

type Errorkeys = 'typeImageName';

export default function CreateTypeImagePageView(props: PropsComponent) {
    const [loading, setLoading] = useState<boolean>(false);
    const [, setResultMessage] = useSessionStorage('', 'result-message');
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            typeImageName: ''
        },
        validate: (data: FormikType) => {
            const errors: {
                typeImageName?: string;
            } = {};
            if (!data.typeImageName) {
                errors.typeImageName = 'Chưa nhập tên Type Image';
            }
            return errors;
        },
        onSubmit: async (data: FormikType) => {
            setLoading(true);
            await typeImageCreate({
                typeImageName: data.typeImageName
            }).then((rs) => {
                if (rs) {
                    setResultMessage('Tạo mới một Type Image thành công');
                    router.replace('/type-image');
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
                <h5>Tạo Type Image mới </h5>
                <div className="field">
                    <label htmlFor="typeImageName">Tên Type Image</label>
                    <InputText className={`${handleErrorValidate('typeImageName') && 'p-invalid'}`} id="typeImageName" type="text" value={formik.values.typeImageName} onChange={(e) => formik.setFieldValue('typeImageName', e.target.value)} />
                    <div>{errorFormMessage('typeImageName', handleErrorValidate('typeImageName'))}</div>
                </div>
                <Button label="Tạo" severity="success" type="submit" />
            </form>
        </div>
    );
}

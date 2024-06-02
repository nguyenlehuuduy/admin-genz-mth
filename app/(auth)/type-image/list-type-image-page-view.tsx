'use client';

import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { useSessionStorage } from 'primereact/hooks';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';
import LoadingBlockUI from '../component/loading-block-ui';
import { TypeImageForCard, deleteTypeImage } from '@/app/api/services/typeImageService';

type PropsComponent = {
    listTypeImage: Array<TypeImageForCard>;
};
export default function ListTypeImagePageView(props: PropsComponent) {
    const router = useRouter();
    const toast = useRef<Toast>(null);
    const [resultMessage, setResultMessage] = useSessionStorage('', 'result-message');
    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const [selectFeature, setSelectFeature] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const { mutate } = useSWRConfig();

    useEffect(() => {
        if (resultMessage) {
            toast.current?.show({
                severity: 'info',
                summary: resultMessage
            });
            setResultMessage('');
        }
    }, [resultMessage, setResultMessage]);

    const handleDeleteTypeImage = async (idTypeImage?: string) => {
        try {
            setLoading(true);
            idTypeImage &&
                (await deleteTypeImage(idTypeImage).then((rs) => {
                    if (rs) {
                        mutate('getTypeImageListPageData');
                        setSelectFeature('');
                        setLoading(false);
                        setDisplayConfirmation(false);
                    }
                }));
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="col-12">
            <div className="card">
                <h5>Danh sách Type Image</h5>
                <Button
                    label="Thêm mới"
                    severity="success"
                    outlined
                    onClick={() => {
                        router.push('/type-image/create');
                    }}
                />
                <DataTable value={props.listTypeImage} scrollable scrollHeight="700px" className="mt-3">
                    <Column field="id" header="Id" style={{ flexGrow: 1, flexBasis: '100px' }}></Column>
                    <Column field="typeImageName" header="Tên Type Image" style={{ flexGrow: 1, flexBasis: '160px' }} frozen className="font-bold"></Column>
                    <Column
                        field="tacvu"
                        header="Tác Vụ"
                        style={{ flexGrow: 1, flexBasis: '200px' }}
                        body={(data: TypeImageForCard) => (
                            <div className="flex gap-3">
                                <Button
                                    label="Xóa"
                                    severity="secondary"
                                    outlined
                                    onClick={() => {
                                        setDisplayConfirmation(true);
                                        setSelectFeature(data.id);
                                    }}
                                />
                            </div>
                        )}
                    ></Column>
                </DataTable>
                <Dialog
                    header="Xác nhận"
                    visible={displayConfirmation}
                    onHide={() => setDisplayConfirmation(false)}
                    footer={
                        <>
                            <Button type="button" label="Không" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} text />
                            <Button type="button" label="Có" icon="pi pi-check" onClick={() => handleDeleteTypeImage(selectFeature)} text autoFocus />
                        </>
                    }
                    style={{ width: '350px' }}
                    modal
                >
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        <span>Bạn có chắc muốn xóa Type Image này?</span>
                    </div>
                </Dialog>
                <LoadingBlockUI visible={loading} />
            </div>
        </div>
    );
}

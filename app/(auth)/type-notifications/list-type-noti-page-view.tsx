'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { useSessionStorage } from 'primereact/hooks';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';
import LoadingBlockUI from '../component/loading-block-ui';
import { TypeNotificationForCard, deleteTypeNotification } from '@/app/api/services/typeNotificationService';
import { useRouter } from 'next/navigation';

type PropsComponent = {
    listTypeNotification: Array<TypeNotificationForCard>;
};
export default function ListTypeNotificationPageView(props: PropsComponent) {
    const toast = useRef<Toast>(null);
    const [resultMessage, setResultMessage] = useSessionStorage('', 'result-message');
    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const [selectTypeNotification, setSelectTypeNotification] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const { mutate } = useSWRConfig();
    const router = useRouter();
    useEffect(() => {
        if (resultMessage) {
            toast.current?.show({
                severity: 'info',
                summary: resultMessage
            });
            setResultMessage('');
        }
    }, [resultMessage, setResultMessage]);

    const handleDeleteTypeNotification = async (idTypeNotification?: string) => {
        try {
            setLoading(true);
            idTypeNotification &&
                (await deleteTypeNotification(idTypeNotification).then((rs) => {
                    if (rs) {
                        mutate('getTypeNotificationListPageData');
                        setSelectTypeNotification('');
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
                <h5>Danh sách loại thông báo </h5>
                <Button label="Tạo thêm loại thông báo" severity="info" onClick={() => router.push('/type-notifications/create')} />
                <DataTable value={props.listTypeNotification} scrollable scrollHeight="400px" className="mt-3">
                    <Column field="id" header="ID" style={{ flexGrow: 1, flexBasis: '160px' }} frozen className="font-bold"></Column>
                    <Column field="type_name" header="Tên loại type message" style={{ flexGrow: 1, flexBasis: '100px' }} alignFrozen="left"></Column>
                    <Column field="description" header="Mô tả" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                    <Column field="thumbnail_noti" header="Created_at" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
                    <Column
                        field="company"
                        header="Tác vụ"
                        style={{ flexGrow: 1, flexBasis: '200px' }}
                        body={(data: TypeNotificationForCard) => (
                            <div className="flex gap-3">
                                <Button
                                    label="Xóa"
                                    severity="secondary"
                                    outlined
                                    onClick={() => {
                                        setDisplayConfirmation(true);
                                        setSelectTypeNotification(data.id);
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
                            <Button type="button" label="Có" icon="pi pi-check" onClick={() => handleDeleteTypeNotification(selectTypeNotification)} text autoFocus />
                        </>
                    }
                    style={{ width: '350px' }}
                    modal
                >
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        <span>Bạn có chắc muốn xóa loại thông báo này?</span>
                    </div>
                </Dialog>
                <LoadingBlockUI visible={loading} />
            </div>
        </div>
    );
}

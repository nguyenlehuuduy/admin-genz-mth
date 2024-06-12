"use client"

import { NotificationForCard, deleteNotification } from "@/app/api/services/notificationService"
import { useRouter } from "next/navigation"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useSessionStorage } from "primereact/hooks"
import { Toast } from "primereact/toast"
import { useEffect, useRef, useState } from "react"
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useSWRConfig } from "swr"
import LoadingBlockUI from "../component/loading-block-ui"

type PropsComponent = {
  listNotification: Array<NotificationForCard>
}

export default function ListNotificationPageView(props: PropsComponent) {
  const router = useRouter()
  const toast = useRef<Toast>(null);
  const [resultMessage, setResultMessage] = useSessionStorage('', 'result-message');
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (resultMessage) {
      toast.current?.show({
        severity: 'info',
        summary: resultMessage
      });
      setResultMessage('');
    }
  }, [resultMessage, setResultMessage]);

  const handleDeleteNotification = async (id: string) => {
    try {
      setLoading(true)
      id && await deleteNotification(id).then((rs) => {
        if (rs) {
          mutate('getNotificationListPageData');
          setLoading(false);
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const confirmDelete = (id: string) => {
    confirmDialog({
      message: 'Bạn có chắc chắn muốn xóa thông báo này?',
      header: 'Xác nhận xóa',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Xóa',
      rejectLabel: 'Hủy',
      accept: () => handleDeleteNotification(id)
    });
  }

  return (
    <div className="col-12">
      <Toast ref={toast} position="top-center" />
      <ConfirmDialog />
      <div className="card">
        <Button label="Thêm mới" severity="success" outlined onClick={() => {
          router.push("/notifications/create")
        }} />
        <h5>Danh sách thông báo (notifications)</h5>
        <DataTable value={props.listNotification} scrollable scrollHeight="900px" className="mt-3">
          <Column field="id" header="ID" style={{ flexGrow: 1, flexBasis: '160px' }} frozen className="font-bold"></Column>
          <Column field="message_notifications" header="Thông báo" style={{ flexGrow: 1, flexBasis: '100px' }} alignFrozen="left"></Column>
          <Column field="type_Notification.type_Name" header="Loại thông báo" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
          <Column field="account_id"
            header="Tài khoản nhận thông báo"
            style={{ flexGrow: 1, flexBasis: '200px' }}
            body={(data: NotificationForCard) =>
              <div>
                {data.account.map((item, key) => <p key={key}>{item.id}- {item.fullName}</p>)}
              </div>
            }></Column>
          <Column field="type_Notification.thumbnail_Noti" header="Hình ảnh" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
          <Column field="type_Notification.description" header="Mô tả" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
          <Column field="created_at" header="Ngày tạo" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
          <Column field="company" header="Tác vụ" style={{ flexGrow: 1, flexBasis: '200px' }} body={(data: NotificationForCard) => (
            <div className="flex gap-3">
              <Button label="Xóa" severity="secondary" outlined onClick={() => confirmDelete(data.id)} />
            </div>
          )}></Column>
        </DataTable>
        <LoadingBlockUI visible={loading} />
      </div>
    </div>
  )
}

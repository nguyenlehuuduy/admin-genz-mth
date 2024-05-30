"use client"

import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Dialog } from "primereact/dialog"
import { useSessionStorage } from "primereact/hooks"
import { Toast } from "primereact/toast"
import { useEffect, useRef, useState } from "react"
import { useSWRConfig } from "swr"
import LoadingBlockUI from "../component/loading-block-ui"
import { deletePermissionPost, PermissionPostForCard } from "@/app/api/services/permissionPostService"

type PropsComponent = {   
  listPermissionPost: Array<PermissionPostForCard>
}
export default function ListPermissionPostPageView(props: PropsComponent) {
  const toast = useRef<Toast>(null);
  const [resultMessage, setResultMessage] = useSessionStorage('', 'result-message');
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const [selectPermissionPost, setSelectPermissionPost] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate } = useSWRConfig()

  useEffect(() => {
    if (resultMessage) {
      toast.current?.show({
        severity: 'info',
        summary: resultMessage
      });
      setResultMessage('');
    }
  }, [resultMessage, setResultMessage]);

  const handleDeletePermissionPost = async (idPermissionPost?: string) => {
    try {
      setLoading(true)
      idPermissionPost && await deletePermissionPost(idPermissionPost).then((rs) => {
        if (rs) {
          mutate('getPermissionPostListPageData')
          setSelectPermissionPost("");          setLoading(false);  
          setDisplayConfirmation(false);
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (<div className="col-12">
    <div className="card">
      <h5>Danh sách Permission Post</h5>
      <DataTable value={props.listPermissionPost} scrollable scrollHeight="400px" className="mt-3">
        <Column field="id" header="ID" style={{ flexGrow: 1, flexBasis: '160px' }} frozen className="font-bold"></Column>
        <Column field="code" header="Tên quyền" style={{ flexGrow: 1, flexBasis: '100px' }} alignFrozen="left" ></Column>
        <Column field="description" header="Mô tả" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
        <Column field="company" header="Tác vụ" style={{ flexGrow: 1, flexBasis: '200px' }} body={(data: PermissionPostForCard) => (
          <div className="flex gap-3">
            <Button label="Xóa" severity="secondary" outlined onClick={() => {
              setDisplayConfirmation(true)
              setSelectPermissionPost(data.id)
            }} />
          </div>
        )}></Column>
      </DataTable>
      <Dialog
        header="Xác nhận"
        visible={displayConfirmation}
        onHide={() => setDisplayConfirmation(false)}
        footer={
          <>
            <Button type="button" label="Không" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} text />
            <Button type="button" label="Có" icon="pi pi-check" onClick={() => handleDeletePermissionPost(selectPermissionPost)} text autoFocus />
          </>
        }
        style={{ width: '350px' }} modal>
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          <span>Bạn có chắc muốn xóa quyền này?</span>
        </div>
      </Dialog>
      <LoadingBlockUI visible={loading} />
    </div>
  </div>)
}
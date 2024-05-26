"use client"

import { deleteHotContent, HotContentForCard } from "@/app/api/services/hot-contentService"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Dialog } from "primereact/dialog"
import { useSessionStorage } from "primereact/hooks"
import { Toast } from "primereact/toast"
import { useEffect, useRef, useState } from "react"
import { useSWRConfig } from "swr"
import LoadingBlockUI from "../component/loading-block-ui"

type PropsComponent = {   
  listHotcontent: Array<HotContentForCard>
}
export default function ListHotContentPageView(props: PropsComponent) {
  const toast = useRef<Toast>(null);
  const [resultMessage, setResultMessage] = useSessionStorage('', 'result-message');
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const [selectHotContent, setSelectHotContent] = useState<string>();
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

  const handleDeleteHotcontent = async (idHotContent?: string) => {
    try {
      setLoading(true)
      idHotContent && await deleteHotContent(idHotContent).then((rs) => {
        if (rs) {
          mutate('getHotContentListPageData')
          setSelectHotContent("");
          setLoading(false);
          setDisplayConfirmation(false);
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (<div className="col-12">
    <div className="card">
      <h5>Danh sách Hot Content</h5>
      <DataTable value={props.listHotcontent} scrollable scrollHeight="400px" className="mt-3">
        <Column field="id" header="ID" style={{ flexGrow: 1, flexBasis: '160px' }} frozen className="font-bold"></Column>
        <Column field="title" header="Tên hot content" style={{ flexGrow: 1, flexBasis: '100px' }} alignFrozen="left" ></Column>
        <Column field="thumbnailFileName" header="thumbnailFileName" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
        <Column field="url" header="url" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
        <Column field="company" header="Tác vụ" style={{ flexGrow: 1, flexBasis: '200px' }} body={(data: HotContentForCard) => (
          <div className="flex gap-3">
            <Button label="Xóa" severity="secondary" outlined onClick={() => {
              setDisplayConfirmation(true)
              setSelectHotContent(data.id)
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
            <Button type="button" label="Có" icon="pi pi-check" onClick={() => handleDeleteHotcontent(selectHotContent)} text autoFocus />
          </>
        }
        style={{ width: '350px' }} modal>
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          <span>Bạn có chắc muốn xóa hot content này?</span>
        </div>
      </Dialog>
      <LoadingBlockUI visible={loading} />
    </div>
  </div>)
}
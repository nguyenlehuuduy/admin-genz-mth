'use client';

import { FeaturesForCard, deleteFeature } from "@/app/api/services/featuresService";
import { useRouter } from "next/navigation"
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useSessionStorage } from "primereact/hooks";
import { Toast } from "primereact/toast";
import { ToggleButton } from "primereact/togglebutton";
import { useEffect, useRef, useState } from "react";
import { useSWRConfig } from "swr";
import LoadingBlockUI from "../component/loading-block-ui";

type PropsComponent = {
    listFeatures: Array<FeaturesForCard>;
};
export default function ListFeaturePageView(props: PropsComponent) {
    const router = useRouter()
    const toast = useRef<Toast>(null);
    const [resultMessage, setResultMessage] = useSessionStorage('', 'result-message');
    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const [selectFeature, setSelectFeature] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const { mutate } = useSWRConfig()

    console.log("List Features",props.listFeatures)

    useEffect(() => {
        if (resultMessage) {
          toast.current?.show({
            severity: 'info',
            summary: resultMessage
          });
          setResultMessage('');
        }
      }, [resultMessage, setResultMessage]);
    
      const handleDeleteFeature = async (idFeature?: string) => {
        try {
          setLoading(true)
          idFeature && await deleteFeature(idFeature).then((rs) => {
            if (rs) {
              mutate('getFeatureListPageData')
              setSelectFeature("");
              setLoading(false);
              setDisplayConfirmation(false);
            }
          })
        } catch (error) {
          console.error(error);
        }
      }
    return (
        <div className="col-12">
    <div className="card">
        <h5>Danh sách Features</h5>
        <Button label="Thêm mới" severity="success" outlined onClick={() => {
        router.push("/features/create")
      }} />
        <DataTable value={props.listFeatures} scrollable scrollHeight="400px" className="mt-3">
            <Column field="id" header="Id" style={{ flexGrow: 1, flexBasis: '100px' }}></Column>
            <Column field="name" header="Tên tính năng" style={{ flexGrow: 1, flexBasis: '160px' }} frozen className="font-bold"></Column>
            <Column field="thumbnailFileName" header="Tên tệp hình thu nhỏ(Thumbnail)" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
            <Column field="url" header="Đường dẫn URL" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
            <Column field="created_at" header="Ngày tạo" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
            <Column field="updated_at" header="Ngày cập nhật" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
            <Column field="tacvu" header="Tác Vụ" style={{ flexGrow: 1, flexBasis: '200px' }} body={(data : FeaturesForCard) => (
            <div className="flex gap-3">
                <Button label="Chỉnh sửa" severity="info" outlined />
                <Button label="Xóa" severity="secondary" outlined onClick={() => {
              setDisplayConfirmation(true)
              setSelectFeature(data.id)
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
            <Button type="button" label="Có" icon="pi pi-check" onClick={() => handleDeleteFeature(selectFeature)} text autoFocus />
          </>
        }
        style={{ width: '350px' }} modal>
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          <span>Bạn có chắc muốn xóa tính năng này?</span>
        </div>
      </Dialog>
      <LoadingBlockUI visible={loading} />
    </div>
</div>

    );

}
"use client"

import { RoleForCard } from "@/app/api/services/roleService"
import { useRouter } from "next/navigation"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useSessionStorage } from "primereact/hooks"
import { Toast } from "primereact/toast"
import { useEffect, useRef } from "react"

type PropsComponent = {
  listRole: Array<RoleForCard>
}
export default function ListRolePageView(props: PropsComponent) {
  const router = useRouter()
  const toast = useRef<Toast>(null);
  const [resultMessage, setResultMessage] = useSessionStorage('', 'result-message');
  useEffect(() => {
    if (resultMessage) {
      toast.current?.show({
        severity: 'info',
        summary: resultMessage
      });
      setResultMessage('');
    }
  }, [resultMessage, setResultMessage]);

  return (<div className="col-12">
    <Toast ref={toast} position="top-center" />
    <div className="card">
      <Button label="Thêm mới" severity="success" outlined onClick={() => {
        router.push("/roles/create")
      }} />
      <h5>Danh sách quyền (roles)</h5>
      <DataTable value={props.listRole} scrollable scrollHeight="400px" className="mt-3">
        <Column field="id" header="ID" style={{ flexGrow: 1, flexBasis: '160px' }} frozen className="font-bold"></Column>
        <Column field="name_role" header="Tên quyền" style={{ flexGrow: 1, flexBasis: '100px' }} alignFrozen="left"></Column>
        <Column field="description_role" header="Mô tả" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
        <Column field="created_at" header="Ngày tạo" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
        <Column field="company" header="Tác vụ" style={{ flexGrow: 1, flexBasis: '200px' }} body={(data: RoleForCard) => (
          <div className="flex gap-3">
            <Button label="Xem chi tiết" outlined />
            <Button label="Xóa" severity="secondary" outlined />
            <Button label="Chỉnh sửa" severity="success" outlined />
          </div>
        )}></Column>
      </DataTable>
    </div>
  </div>)
}
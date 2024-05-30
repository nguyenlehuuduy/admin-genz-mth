import { BreadCrumb } from "primereact/breadcrumb";
import CreateRolePageView from "./type-message-create-page-view";
export default function CreateRolePage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách quyền', url: '/roles' },
    { label: 'tạo quyền', url: '/roles/create' }]
  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

      <div className="col-12">
        <CreateRolePageView />
      </div>
    </div>
  );
}

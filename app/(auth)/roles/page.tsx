import { BreadCrumb } from "primereact/breadcrumb";
import ListRolePageView from "./list-role-page-view";
import { getAllRole } from "@/app/api/services/roleService";

export default async function ListRolePage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách quyền', url: '/roles' }]

  const listRole = await getAllRole();
  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

      <div className="col-12">
        <ListRolePageView listRole={listRole ?? []} />
      </div>
    </div>
  );
}
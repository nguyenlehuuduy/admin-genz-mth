import { BreadCrumb } from "primereact/breadcrumb";
import CreatePermissionPostPageView from "./permission-post-create-page-view";

export default function CreatePermissionPostPage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách quyền', url: '/permission-post' },
    { label: 'tạo quyền', url: '/permission-post/create' }];
  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

      <div className="col-12">
        <CreatePermissionPostPageView />
      </div>
    </div>
  );
}
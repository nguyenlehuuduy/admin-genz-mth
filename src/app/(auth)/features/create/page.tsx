import { BreadCrumb } from "primereact/breadcrumb";
import CreateFeaturesPageView from "./features-create-page-view";
export default function CreateRolePage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách tính năng', url: '/features' },
    { label: 'tạo tính năng mới', url: '/features/create' }]
  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

      <div className="col-12">
        <CreateFeaturesPageView />
      </div>
    </div>
  );
}
import { BreadCrumb } from "primereact/breadcrumb";
import CreateFavoriteTagPageView from "./favorite-tag-create-page-view";
export default function CreateRolePage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách favorite tag', url: '/favorite-tag' },
    { label: 'tạo favorite tag mới', url: '/favorite-tag/create' }]
  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

      <div className="col-12">
        <CreateFavoriteTagPageView />
      </div>
    </div>
  );
}
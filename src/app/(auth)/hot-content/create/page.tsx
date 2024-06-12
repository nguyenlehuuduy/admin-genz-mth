import { BreadCrumb } from "primereact/breadcrumb";
import CreateHotContentPageView from "./hot-content-create-page-view";
export default function CreateHotContentPage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách hot content', url: '/hot-content' },
    { label: 'tạo hot content', url: '/hot-content/create' }];
  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

      <div className="col-12">
        <CreateHotContentPageView />
      </div>
    </div>
  );
}
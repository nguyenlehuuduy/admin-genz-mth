import { BreadCrumb } from "primereact/breadcrumb";
import NotificationListPageDataFetcher from "./data-fetcher";

export default function ListNotificationPage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách quyền', url: '/roles' }]

  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

      <div className="col-12">
        <NotificationListPageDataFetcher />
      </div>
    </div>
  );
}

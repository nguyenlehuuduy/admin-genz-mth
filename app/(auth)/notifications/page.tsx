import { BreadCrumb } from "primereact/breadcrumb";
import ListNotificationPageView from "@/app/(auth)/notifications/list-notifications-page-view";
import { getListNotification } from "@/app/api/services/notificationService";

export default async function ListNotificationPage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách quyền', url: '/roles' }]

  const listNotification = await getListNotification();
  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

      <div className="col-12">
        <ListNotificationPageView listNotification={listNotification ?? []} />
      </div>
    </div>
  );
}

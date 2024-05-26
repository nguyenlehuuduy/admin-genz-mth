import { BreadCrumb } from 'primereact/breadcrumb';
import CreateNotificationPageView from '@/app/(auth)/notifications/create/notifications-create-page-view';
export default function CreateRolePage() {
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [
        { label: 'trang chủ', url: '/' },
        { label: 'danh sách quyền', url: '/roles' },
        { label: 'tạo quyền', url: '/roles/create' }
    ];
    return (
        <div className="grid">
            <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

            <div className="col-12">
                <CreateNotificationPageView />
            </div>
        </div>
    );
}

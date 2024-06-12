import { BreadCrumb } from 'primereact/breadcrumb';
import CreateTypeNotificationPageView from './type-noti-create-page-view';
export default function CreateRolePage() {
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [
        { label: 'trang chủ', url: '/' },
        { label: 'danh sách loại thông báo', url: '/type-notifications' },
        { label: 'tạo loại thông báo', url: '/type-notifications/create' }
    ];
    return (
        <div className="grid">
            <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

            <div className="col-12">
                <CreateTypeNotificationPageView />
            </div>
        </div>
    );
}

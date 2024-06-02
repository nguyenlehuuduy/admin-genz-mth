import { BreadCrumb } from 'primereact/breadcrumb';
import CreateNotificationListPageDataFetcher from './data-fetcher';
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
                <CreateNotificationListPageDataFetcher />
            </div>
        </div>
    );
}

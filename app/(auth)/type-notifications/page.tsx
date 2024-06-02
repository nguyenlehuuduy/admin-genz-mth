import TypeNotificationListPageDataFetcher from './data-fetcher';
import { BreadCrumb } from 'primereact/breadcrumb';

export default function ListTypeNotificationPage() {
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [
        { label: 'trang chủ', url: '/' },
        { label: 'danh sách loại thông báo', url: '/type-notifications' }
    ];
    return (
        <div className="grid">
            <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
            <div className="col-12">
                <TypeNotificationListPageDataFetcher />
            </div>
        </div>
    );
}

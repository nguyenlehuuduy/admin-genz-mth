import { BreadCrumb } from 'primereact/breadcrumb';
import TabMenuListPageDataFetcher from './data-fetcher';

export default async function ListTabMenuPage() {
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [
        { label: 'trang chủ', url: '/' },
        { label: 'Danh sách Tab Menu', url: '/tab-menu' }
    ];
    return (
        <div className="grid">
            <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
            <div className="col-12">
                <TabMenuListPageDataFetcher />
            </div>
        </div>
    );
}

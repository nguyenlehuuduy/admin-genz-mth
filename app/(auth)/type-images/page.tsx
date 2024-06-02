import { BreadCrumb } from 'primereact/breadcrumb';
import TypeImageListPageDataFetcher from './data-fetcher';

export default function ListTypeImagePage() {
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [
        { label: 'trang chủ', url: '/' },
        { label: 'danh sách type image', url: '/type-images' }
    ];
    return (
        <div className="grid">
            <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
            <div className="col-12">
                <TypeImageListPageDataFetcher />
            </div>
        </div>
    );
}

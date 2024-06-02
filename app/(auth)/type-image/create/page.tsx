import { BreadCrumb } from 'primereact/breadcrumb';
import CreateTypeImagePageView from './type-image-create-page-view';
export default function CreateRolePage() {
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [
        { label: 'trang chủ', url: '/' },
        { label: 'danh sách tính năng', url: '/tab-menu' },
        { label: 'tạo tính năng mới', url: '/tab-menu/create' }
    ];
    return (
        <div className="grid">
            <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

            <div className="col-12">
                <CreateTypeImagePageView />
            </div>
        </div>
    );
}

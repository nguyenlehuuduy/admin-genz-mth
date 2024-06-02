import { BreadCrumb } from 'primereact/breadcrumb';
import CreateTypeImagePageView from './type-message-create-page-view';
export default function CreateRolePage() {
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [
        { label: 'trang chủ', url: '/' },
        { label: 'danh sách loại hình ảnh', url: '/type-images' },
        { label: 'tạo loại hình ảnh', url: '/type-images/create' }
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

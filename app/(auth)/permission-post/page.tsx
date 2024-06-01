import { BreadCrumb } from "primereact/breadcrumb";
import PermissionPostListPageDateFetcher from "./data-fetcher";

export default async function ListPermissionPostPage() {
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [
        { label: 'trang chủ', url: '/' },
        { label: 'danh sách bài viết', url: '/permission-post' }]
    return (
        <div className="grid">
            <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

            <div className="col-12">
                <PermissionPostListPageDateFetcher />
            </div>
        </div>
    );
}
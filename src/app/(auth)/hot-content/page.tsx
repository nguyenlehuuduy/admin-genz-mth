import { BreadCrumb } from "primereact/breadcrumb";
import HotContentListPageDataFetcher from "./data-fetcher";


export default function ListHotContentPage() {
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [
        { label: 'trang chủ', url: '/' },
        { label: 'danh sách hot content', url: '/hot-content' }]
    return (
        <div className="grid">
            <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
            <div className="col-12">
                <HotContentListPageDataFetcher />
            </div>
        </div>
    );
}
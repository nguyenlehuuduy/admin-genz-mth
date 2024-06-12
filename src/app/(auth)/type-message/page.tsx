import TypeMessageListPageDataFetcher from "./data-fetcher";
import { BreadCrumb } from "primereact/breadcrumb";



export default function ListHotContentPage() {
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [
        { label: 'trang chủ', url: '/' },
        { label: 'danh sách type message', url: '/type-message' }]
    return (
        <div className="grid">
            <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
            <div className="col-12">
                <TypeMessageListPageDataFetcher />
            </div>
        </div>
    );
}

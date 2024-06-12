import { BreadCrumb } from "primereact/breadcrumb";
import FeatureListPageDataFetcher from "./data-fetcher";

export default async function ListFeaturesPage() {
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [
        { label: 'trang chủ', url: '/' },
        { label: 'danh sách tính năng', url: '/features' }]
    return (
        <div className="grid">
            <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
            <div className="col-12">
                <FeatureListPageDataFetcher />
            </div>
        </div>
    );
}
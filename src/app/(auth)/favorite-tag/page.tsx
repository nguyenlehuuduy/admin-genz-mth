import { BreadCrumb } from "primereact/breadcrumb";
import FavoriteTagListPageDataFetcher from "./data-fetcher";

export default async function ListFeaturesPage() {
        const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
        const breadcrumbItems = [
            { label: 'trang chủ', url: '/' },
            { label: 'danh sách favorite tags', url: '/features' }]
        return (
            <div className="grid">
                <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
                <div className="col-12">
        <FavoriteTagListPageDataFetcher />
      </div>
            </div>
        );
}
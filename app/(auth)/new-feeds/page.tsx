import { BreadCrumb } from 'primereact/breadcrumb';
import NewFeedPageView from './new-feeds-page-view';

type Props = {
    searchParams: {
        limit?: number;
        pageNo?: number;
        sortBy?: string;
        orderBy?: 'asc' | 'desc';
        contentTextKey?: string;
        nameAccountKey?: string;
        emailAccountKey?: string;
        createdDateFrom?: string;
        createdDateTo?: string;
    };
};
export default async function NewFeeds(props: Props) {
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [
        { label: 'trang chủ', url: '/' },
        { label: 'danh sách bài viết', url: '/new-feeds' }]
    return (
        <div className="grid">
            <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

            <div className="col-12">
                <NewFeedPageView condition={props.searchParams} />
            </div>
        </div>
    );
}

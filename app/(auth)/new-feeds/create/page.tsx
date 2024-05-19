import { BreadCrumb } from 'primereact/breadcrumb';
import CreatePostPageView from './create-post-page-view';

export default function CreatePostPage() {
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [{ label: 'trang chủ', url: '/' }, { label: 'danh sách bài viết', url: '/new-feeds' }, { label: 'tạo bài viết', url: '/new-feeds/create' }]
    return (
        <div className="grid">
            <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
            <div className="col-12">
                <CreatePostPageView />
            </div>
        </div>
    );
}

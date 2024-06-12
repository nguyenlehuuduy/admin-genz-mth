import { BreadCrumb } from "primereact/breadcrumb";
import DetailPostPageView from "./detail-post-page-view"
import { notFound } from "next/navigation";
import { getDetailPost } from "@/src/app/api/services/postService";

type Props = {
  params: {
    id: string
  }
}

export default async function DetailPost(props: Props) {
  const detailPost = await getDetailPost(props.params.id);
  if (!detailPost) {
    notFound()
  }
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách bài viết', url: '/new-feeds' },
    { label: 'chi tiết bài viết', url: `/new-feeds/${props.params.id}/detail` }]
  return (<div className="grid">
    <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
    <div className="col-12">
      <DetailPostPageView detailPost={detailPost} />
    </div>
  </div>)
}
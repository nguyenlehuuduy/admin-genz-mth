"use client"

import { PostDetailForCard, PostForCard } from "@/app/api/services/postService";
import Link from "next/link";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Fieldset } from "primereact/fieldset"
import { Image } from "primereact/image";
import { ToggleButton } from "primereact/togglebutton";

type PropsComponent = {
  detailPost: PostDetailForCard
}
export default function DetailPostPageView(props: PropsComponent) {
  return (<div className="card">
    <h5>Chi tiết bài viết</h5>
    <Fieldset legend="Nội dung bài viết" className="flex flex-column" toggleable>
      <div>{props.detailPost.content_text}
      </div>
      <b>ngày tạo: {props.detailPost.created_at}</b>
    </Fieldset>
    <div className="col-12 flex flex-wrap gap-2 align-items-center">
      {props.detailPost.image_post.map((item, index) =>
        <Image key={index} src={item} alt="Image" width="250" preview />)}
    </div>
    <Fieldset legend="Thông tin tài khoản" toggleable>
      <p>
        Tên tài khoản: {props.detailPost.account.name}
      </p>
      <p>
        nickname: {props.detailPost.account.nick_name}
      </p>
      <p>ảnh đại diện: </p>
      <Image src={props.detailPost.account.avata} alt="Image" width="250" height="250" preview />
    </Fieldset>
    <ul className="list-none p-0 mt-10">
      <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
        <div>
          <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Tống số lượt like: </span>
        </div>
        <div className="mt-2 md:mt-0 flex align-items-center">
          <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
            <div className="bg-orange-500 h-full" style={{ width: `${props.detailPost.total_reaction / 100}` }} />
          </div>
          <span className="text-orange-500 ml-3 font-medium">{props.detailPost.total_reaction ?? 0} lượt</span>
        </div>
      </li>
      <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
        <div>
          <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Tống số lượt comment:</span>
        </div>
        <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
          <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
            <div className="bg-cyan-500 h-full" style={{ width: `${props.detailPost.total_comment / 100}` }} />
          </div>
          <span className="text-cyan-500 ml-3 font-medium">{props.detailPost.total_comment ?? 0} lượt</span>
        </div>
      </li>
      <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
        <div>
          <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Tống số lượt chia sẻ:</span>
        </div>
        <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
          <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
            <div className="bg-pink-500 h-full" style={{ width: `${props.detailPost.total_share / 100}` }} />
          </div>
          <span className="text-pink-500 ml-3 font-medium">{props.detailPost.total_share ?? 0} lượt</span>
        </div>
      </li>

    </ul>

    <div className="col-12">
      <div className="card">
        <h5>Tẩt cả thông tin các bình luận</h5>

        <DataTable value={props.detailPost.all_comment} scrollable scrollHeight="400px" className="mt-3">
          <Column field="account.name" header="Tên tài khoản" style={{ flexGrow: 1, flexBasis: '160px' }} frozen className="font-bold"></Column>
          <Column header="Ảnh đại diện" style={{ flexGrow: 1, flexBasis: '200px' }} body={(data: PostDetailForCard) =>
            <Image src={data.account.avata} />
          }></Column>
          <Column field="created_at" header="Thời gian thực hiện" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
          <Column field="content" header="Nội dung bình luận" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
          <Column field="updated_at" header="Cập nhật" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
          <Column field="" header="tác vụ" style={{ flexGrow: 1, flexBasis: '200px' }}
            body={(data: PostDetailForCard) => <Link href={""}> chi tiết tài khoản </Link>
            }>
          </Column>

        </DataTable>
      </div>

      <div className="card">
        <h5>Tẩt cả thông tin về lượt like</h5>

        <DataTable value={props.detailPost.all_like_info} scrollable scrollHeight="400px" className="mt-3">
          <Column field="account.name" header="Tên tài khoản" style={{ flexGrow: 1, flexBasis: '160px' }} frozen className="font-bold"></Column>
          <Column header="Ảnh đại diện" style={{ flexGrow: 1, flexBasis: '200px' }} body={(data: PostDetailForCard) =>
            <Image src={data.account.avata} />
          }></Column>
          <Column field="created_at" header="Thời gian thực hiện" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
          <Column field="updated_at" header="Cập nhật" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
          <Column field="" header="tác vụ" style={{ flexGrow: 1, flexBasis: '200px' }}
            body={(data: PostDetailForCard) => <Link href={""}> chi tiết tài khoản </Link>
            }>
          </Column>

        </DataTable>
      </div>

      <div className="card">
        <h5>Tẩt cả thông tin về lượt chia sẻ</h5>

        <DataTable value={props.detailPost.all_share_info} scrollable scrollHeight="400px" className="mt-3">
          <Column field="account.name" header="Tên tài khoản" style={{ flexGrow: 1, flexBasis: '160px' }} frozen className="font-bold"></Column>
          <Column header="Ảnh đại diện" style={{ flexGrow: 1, flexBasis: '200px' }} body={(data: PostDetailForCard) =>
            <Image src={data.account.avata} />
          }></Column>
          <Column field="created_at" header="Thời gian thực hiện" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
          <Column field="updated_at" header="Cập nhật" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
          <Column field="" header="tác vụ" style={{ flexGrow: 1, flexBasis: '200px' }}
            body={(data: PostDetailForCard) => <Link href={""}> chi tiết tài khoản </Link>
            }>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>)
}
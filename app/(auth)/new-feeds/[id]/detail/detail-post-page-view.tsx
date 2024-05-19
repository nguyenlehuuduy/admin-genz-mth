"use client"

import { PostForCard } from "@/app/api/services/postService";
import { Fieldset } from "primereact/fieldset"
import { Image } from "primereact/image";

type PropsComponent = {
  detailPost: PostForCard
}
export default function DetailPostPageView(props: PropsComponent) {
  return (<div className="card">
    <h5>Chi tiết bài viết</h5>
    <Fieldset legend="Nội dung bài viết" toggleable>
      <span>{props.detailPost.content_text}
      </span>
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
      <Image src={props.detailPost.account.avata} alt="Image" width="250" preview />

    </Fieldset>

  </div>)
}
"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Message } from "primereact/message";
import { useState } from "react";
import LoadingBlockUI from "../../component/loading-block-ui";
import { useSessionStorage } from "primereact/hooks";
import { useRouter } from "next/navigation";
import { postHotContent } from "@/src/app/api/services/hot-contentService";

type PropsComponent = {

}

type FormikType = {
  title: string;
  thumbnailFileName: string;
  url: string;
};

type Errorkeys = 'title' | 'thumbnailFileName' | 'url';

export default function CreateHotContentPageView(props: PropsComponent) {
  const [loading, setLoading] = useState<boolean>(false)
  const [, setResultMessage] = useSessionStorage("", "result-message");
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      title: '',
      thumbnailFileName: '',
      url: ''
    },
    validate: (data: FormikType) => {
      const errors: {
        title?: string;
        thumbnailFileName?: string;
        url?: string;
      } = {};
      if (!data.title) {
        errors.title = 'chưa nhập tên hot content';
      }
      if (!data.thumbnailFileName) {
        errors.thumbnailFileName = 'chưa nhập ảnh hotcontent này';
      }
      if (!data.url) {
        errors.url = 'chưa nhập url hotcontent này';
      }

      return errors;
    },
    onSubmit: async (data: FormikType) => {
      setLoading(true)
      await postHotContent({
        title: data.title,
        thumbnailFileName: data.thumbnailFileName,
        url: data.url
      }).then((rs) => {
        if (rs) {
          setResultMessage("Tạo mới một hotcontent thành công");
          router.replace("/hot-content")
        }
      })
      setLoading(false);
    }
  });


  const handleErrorValidate = (key: Errorkeys) => {
    return !!(formik.touched[key] && formik.errors[key]);
  };
  const errorFormMessage = (key: Errorkeys, condition?: boolean, className?: string, style?: React.CSSProperties) => {
    return <div>{condition &&
      <Message
        severity="error"
        text={String(formik.errors[key])}
        className={className}
        style={style} />}</div>;
  };

  return (<div className="card p-fluid">
    <LoadingBlockUI visible={loading} />
    <form onSubmit={formik.handleSubmit}>
      <h5>Tạo hot content</h5>
      <div className="field">
        <label htmlFor="title">Tên HotContent</label>
        <InputText
          className={`${handleErrorValidate('title') && 'p-invalid'}`}
          id="title" type="text"
          value={formik.values.title}
          onChange={(e) => formik.setFieldValue("title", e.target.value)} />
        <div>{errorFormMessage('title', handleErrorValidate('title'))}</div>
      </div>
      <div className="field">
        <label htmlFor="thumbnailFileName">Ảnh</label>
        <InputText
          className={`${handleErrorValidate('thumbnailFileName') && 'p-invalid'}`}
          id="thumbnailFileName" type="text"
          value={formik.values.thumbnailFileName}
          onChange={(e) => formik.setFieldValue("thumbnailFileName", e.target.value)} />
        <div>{errorFormMessage('thumbnailFileName', handleErrorValidate('thumbnailFileName'))}</div>
      </div>
      <div className="field">
        <label htmlFor="url">url</label>
        <InputText
          className={`${handleErrorValidate('url') && 'p-invalid'}`}
          id="url" type="text"
          value={formik.values.url}
          onChange={(e) => formik.setFieldValue("url", e.target.value)} />
        <div>{errorFormMessage('url', handleErrorValidate('url'))}</div>
      </div>
      <Button label="tạo" severity="success" type="submit" />
    </form>
  </div>)
}
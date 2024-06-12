"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Message } from "primereact/message";
import { useState } from "react";
import LoadingBlockUI from "../../component/loading-block-ui";
import { useSessionStorage } from "primereact/hooks";
import { useRouter } from "next/navigation";
import { postTypeMessage } from "@/src/app/api/services/typeMessageService";

type PropsComponent = {

}

type FormikType = {
  nameTypeMessage: string;
  descriptionTypeMessage: string;
};

type Errorkeys = 'nameTypeMessage' | 'descriptionTypeMessage';

export default function CreateTypeMessagePageView(props: PropsComponent) {
  const [loading, setLoading] = useState<boolean>(false)
  const [, setResultMessage] = useSessionStorage("", "result-message");
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      nameTypeMessage: '',
      descriptionTypeMessage: ''
    },
    validate: (data: FormikType) => {
      const errors: {
        nameTypeMessage?: string;
        descriptionTypeMessage?: string;
      } = {};
      if (!data.nameTypeMessage) {
        errors.nameTypeMessage = 'chưa nhập tên quyền';
      }
      if (!data.descriptionTypeMessage) {
        errors.descriptionTypeMessage = 'chưa nhập mô tả quyền này';
      }

      return errors;
    },
    onSubmit: async (data: FormikType) => {
      setLoading(true)
      await postTypeMessage({
        descriptionTypeMessage: data.descriptionTypeMessage,
        nameTypeMessage: data.nameTypeMessage
      }).then((rs) => {
        if (rs) {
          setResultMessage("Tạo mới một quyền thành công");
          router.replace("/type-message")
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
      <h5>Tạo type-message (Type Message)</h5>
      <div className="field">
        <label htmlFor="nameTypeMessage">Tên loại</label>
        <InputText
          className={`${handleErrorValidate('nameTypeMessage') && 'p-invalid'}`}
          id="nameTypeMessage" type="text"
          value={formik.values.nameTypeMessage}
          onChange={(e) => formik.setFieldValue("nameTypeMessage", e.target.value)} />
        <div>{errorFormMessage('nameTypeMessage', handleErrorValidate('nameTypeMessage'))}</div>
      </div>
      <div className="field">
        <label htmlFor="descriptionTypeMessage">Mô tả</label>
        <InputText
          className={`${handleErrorValidate('descriptionTypeMessage') && 'p-invalid'}`}
          id="descriptionTypeMessage" type="text"
          value={formik.values.descriptionTypeMessage}
          onChange={(e) => formik.setFieldValue("descriptionTypeMessage", e.target.value)} />
        <div>{errorFormMessage('descriptionTypeMessage', handleErrorValidate('descriptionTypeMessage'))}</div>
      </div>
      <Button label="tạo" severity="success" type="submit" />
    </form>
  </div>)
}

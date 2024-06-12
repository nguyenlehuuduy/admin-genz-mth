"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Message } from "primereact/message";
import { useState } from "react";
import LoadingBlockUI from "../../component/loading-block-ui";
import { useSessionStorage } from "primereact/hooks";
import { useRouter } from "next/navigation";
import { postFavoriteTag } from "@/src/app/api/services/favoritetagService";

type PropsComponent = {

}

type FormikType = {
  nameFavorite: string;
  descriptionFavorite: string;
};

type Errorkeys = 'nameFavorite' | 'descriptionFavorite'

export default function CreateFavoriteTagPageView(props: PropsComponent) {
  const [loading, setLoading] = useState<boolean>(false)
  const [, setResultMessage] = useSessionStorage("", "result-message");
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      nameFavorite: '',
      descriptionFavorite: '',
    },
    validate: (data: FormikType) => {
      const errors: {
        nameFavorite?: string;
        descriptionFavorite?: string;
      } = {};
      if (!data.nameFavorite) {
        errors.nameFavorite = 'Chưa nhập tên favorite tag';
      }
      if (!data.descriptionFavorite) {
        errors.descriptionFavorite = 'Chưa nhập mô tả favorite tag';
      }

      return errors;
    },
    onSubmit: async (data: FormikType) => {
      setLoading(true)
      await postFavoriteTag({
        nameFavorite: data.nameFavorite,
        descriptionFavorite: data.descriptionFavorite,
      }).then((rs) => {
        if (rs) {
          setResultMessage("Tạo mới một favorite tag thành công");
          router.replace("/favorite-tag")
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
      <h5>Tạo favorite tag mới </h5>
      <div className="field">
        <label htmlFor="nameFavorite">Tên favorite tag</label>
        <InputText
          className={`${handleErrorValidate('nameFavorite') && 'p-invalid'}`}
          id="nameFavorite" type="text"
          value={formik.values.nameFavorite}
          onChange={(e) => formik.setFieldValue("nameFavorite", e.target.value)} />
        <div>{errorFormMessage('nameFavorite', handleErrorValidate('nameFavorite'))}</div>
      </div>
      <div className="field">
        <label htmlFor="descriptionFavorite">Mô tả favorite tag</label>
        <InputText
          className={`${handleErrorValidate('descriptionFavorite') && 'p-invalid'}`}
          id="descriptionFavorite" type="text"
          value={formik.values.descriptionFavorite}
          onChange={(e) => formik.setFieldValue("descriptionFavorite", e.target.value)} />
        <div>{errorFormMessage('descriptionFavorite', handleErrorValidate('descriptionFavorite'))}</div>
      </div>
      <Button label="Tạo" severity="success" type="submit" />
    </form>
  </div>)
}
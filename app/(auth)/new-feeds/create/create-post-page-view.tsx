'use client';

import { FieldArray, FormikProvider, useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Message } from 'primereact/message';
import { useState } from 'react';
import FileUploadItem from '../../component/file-item';
import { uploadImage } from '@/app/api/services/imageService';
import { uploadPost } from '@/app/api/services/postService';
import LoadingBlockUI from '../../component/loading-block-ui';
import { useRouter } from 'next/navigation';
import { useSessionStorage } from 'primereact/hooks';
type FormikType = {
	content: string;
	imageFilePath: Array<File | undefined>;
};
type Errorkeys = 'content' | 'imageFilePath';
export default function CreatePostPageView() {
	const [, setResultMessage] = useSessionStorage("", "result-message");
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter()
	const formik = useFormik({
		initialValues: {
			content: '',
			imageFilePath: [undefined]
		},
		validate: (data: FormikType) => {
			const errors: {
				content?: string;
				imageFilePath?: string;
			} = {};
			if (!data.content) {
				errors.content = 'chưa nhập nội dung';
			}
			data.imageFilePath.map(item => {
				if (!item) {
					errors.imageFilePath = "chưa chọn hình ảnh";
				}
			});
			return errors;
		},
		onSubmit: async (data: FormikType) => {
			setLoading(true)
			const imagePath: Array<string> = []
			for (const img of data.imageFilePath) {
				const res = await uploadImage({ image: img });
				imagePath.push(res?.file_name ?? "");
			}
			const resultPostImage = await uploadPost({
				contentText: data.content,
				imagePaths: imagePath.filter(Boolean)
			})
			if (resultPostImage) {
				setLoading(false)
				setResultMessage("Tạo mới một bài viết thành công");
				router.replace("/new-feeds")
			}
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

	const hasErrorItemInListPassed = (index: number) => {
		return !!(!formik.values.imageFilePath[index] && handleErrorValidate("imageFilePath"));
	};


	return (
		<div className="card">
			<LoadingBlockUI visible={loading} />
			<h5>Tạo bài viết </h5>
			<FormikProvider value={formik}>
				<form onSubmit={formik.handleSubmit}>
					<div className="p-fluid formgrid grid">
						<div className="field col-12">
							<label htmlFor="address">nội dung</label>
							<div>
								<InputTextarea
									className={`${handleErrorValidate('content') && 'p-invalid'}`}
									id="address"
									rows={10}
									value={formik.values.content}
									onChange={(e) => formik.setFieldValue('content', e.target.value)} />
								<div>{errorFormMessage('content', handleErrorValidate('content'))}</div>
							</div>
						</div>
						<div className="field col-12">
							<h5>hình ảnh</h5>
							<div>

								<FieldArray
									name="imageFilePath"
									render={arrayHelpers => (
										<div className="flex w-full flex-wrap">
											{formik.values.imageFilePath && formik.values.imageFilePath.map((item, index) => {
												return (
													<div key={index}>
														<FileUploadItem onChange={(file) => {
															formik.setFieldValue(`imageFilePath.${index}`, !file ? null : file);
														}} />
														{errorFormMessage("imageFilePath", hasErrorItemInListPassed(index))}
														{(formik.values.imageFilePath?.length > 1) && (
															<Button
																type="button"
																icon="pi pi-times"
																onClick={() => arrayHelpers.remove(index)}
																rounded
																text
																severity="danger"
																className="mx-2"
															/>
														)}
													</div>
												);
											}
											)}
											<Button
												type="button"
												icon="pi pi-plus"
												rounded
												outlined
												onClick={() => arrayHelpers.push("")}
												severity="secondary"
											/>
										</div>
									)}
								/>


							</div>
						</div>
						<Button type='submit' label="tạo bài viết" severity="secondary" />
					</div>
				</form >
			</FormikProvider>
		</div >
	);
}

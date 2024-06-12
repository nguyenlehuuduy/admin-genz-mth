export type PostForCreate = {
  contentText: string;
  accountId: string;
  imagePaths?: Array<string>;
};

export type ImageUploadForPost = {
  accountId: string;
  path: string;
  typeImageId?: string;
};

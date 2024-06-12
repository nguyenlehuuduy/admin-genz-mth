"use client";
import { notFound } from "next/navigation";
import useSWR from "swr";
import ListFavoriteTagPageView from "./list-favorite-tag-page-view";
import { FavoriteTagForCard, getAllFavoriteTag } from "../../api/services/favoritetagService";

async function getListFavoriteTag(): Promise<Array<FavoriteTagForCard> | undefined> {
  try {
    return await getAllFavoriteTag();
  } catch (error) {
    console.error(error)
  }
}

const getData = async () => {
  const [listFavoriteTag] = await Promise.all([getListFavoriteTag()]);
  return { listFavoriteTag };
};

export default function FavoriteTagListPageDataFetcher() {
  const { data, error, isLoading } = useSWR(
    "getFavoriteTagListPageData",
    () => getData(),
  );
  if (error) {
    notFound();
  }
  if (isLoading || !data) {
    return <div>đang tải...</div>;
  }
  return (
    <ListFavoriteTagPageView
      listFavoriteTag={data.listFavoriteTag ?? []}
    />
  );
}
"use client";
import { getAllHotContent, HotContentForCard } from "@/app/api/services/hot-contentService";
import { notFound } from "next/navigation";
import useSWR from "swr";
import ListHotContentPageView from "./list-hot-content-page-view";

async function getListHotContent(): Promise<Array<HotContentForCard> | undefined> {
  try {
    return await getAllHotContent();
  } catch (error) {
    console.error(error)
  }
}

const getData = async () => {
  const [listHotcontent] = await Promise.all([getListHotContent()]);
  return { listHotcontent };
};

export default function HotContentListPageDataFetcher() {
  const { data, error, isLoading } = useSWR(
    "getHotContentListPageData",
    () => getData(),
  );
  if (error) {
    notFound();
  }
  if (isLoading || !data) {
    return <div>đang tải...</div>;
  }
  return (
    <ListHotContentPageView
      listHotcontent={data.listHotcontent ?? []}
    />
  );
}

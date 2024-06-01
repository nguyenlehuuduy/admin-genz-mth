"use client";
import { notFound } from "next/navigation";
import useSWR from "swr";
import { FeaturesForCard, getAllFeature } from "@/app/api/services/featuresService";
import ListFeaturePageView from "./list-features-page-view";

async function getListFeatures(): Promise<Array<FeaturesForCard> | undefined> {
  try {
    return await getAllFeature();
  } catch (error) {
    console.error(error)
  }
}

const getData = async () => {
  const [listFeature] = await Promise.all([getListFeatures()]);
  return { listFeature };
};

export default function FeatureListPageDataFetcher() {
  const { data, error, isLoading } = useSWR(
    "getFeatureListPageData",
    () => getData(),
  );
  if (error) {
    notFound();
  }
  if (isLoading || !data) {
    return <div>đang tải...</div>;
  }
  return (
    <ListFeaturePageView
      listFeatures={data.listFeature ?? []}
    />
  );
}
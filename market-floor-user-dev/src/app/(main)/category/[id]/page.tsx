"use client";

import React, { useEffect, useState } from "react";
import ProductGrid from "@/components/organisms/ProductGrid";
import useCategory from "@/hooks/useCategories";
import { CircularProgress } from "@mui/material";

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { listCategory, getCategories } = useCategory();
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState<any>(null);

  useEffect(() => {
    if (!listCategory || listCategory.length === 0) {
      getCategories();
    } else {
      const category = listCategory.find((cat: any) => cat.id.toString() === params.id);
      setCurrentCategory(category);
      setLoading(false);
    }
  }, [params.id, listCategory]);

  useEffect(() => {
    if (listCategory && listCategory.length > 0) {
      const category = listCategory.find((cat: any) => cat.id.toString() === params.id);
      setCurrentCategory(category);
      setLoading(false);
    }
  }, [listCategory]);

  if (loading) {
    return (
      <div className="flex h-[500px] w-full items-center justify-center">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (!currentCategory) {
    return (
      <div className="flex h-[500px] w-full items-center justify-center">
        <p className="text-xl font-semibold">Không tìm thấy danh mục</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full flex-col gap-y-10 px-10 py-10 desktop:w-[1200px] desktop:px-0">
      <h1 className="text-3xl font-bold">{currentCategory.name}</h1>
      <ProductGrid category={currentCategory} />
    </div>
  );
} 
import React from "react";
import ProductLeftSide from "../../organisms/ProductLeftSide";
import ProductRightSide from "../../organisms/ProductRightSide";
import ProductComments from "@/components/organisms/Comments";
import SimilarProducts from "@/components/organisms/SimilarProducts";

interface IProductDetailTemplateProps {
  product: IStoreProduct;
  relatedProduct: IStoreProduct[];
}

const ProductDetailTemplate: React.FC<IProductDetailTemplateProps> = (
  props
) => {
  const { product, relatedProduct } = props;

  return (
    <>
      {!!product ? (
        <>
          <div className="flex gap-y-8 gap-x-[80px] justify-center  flex-col tablet:flex-row">
            <ProductLeftSide storeProduct={product} />
            {!!product ? <ProductRightSide storeProduct={product} /> : null}
          </div>

          <ProductComments productDetail={product} />
          <SimilarProducts listProduct={relatedProduct} />
        </>
      ) : null}
    </>
  );
};

export default ProductDetailTemplate;

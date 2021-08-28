import React, { FC } from "react";
import { useParams } from "react-router-dom";
interface ParamsInterface {
  id: string;
}
const ProductDetailPage: FC = () => {
  const params = useParams<ParamsInterface>();

  return (
    <div>
      ProductDetailPage<p>{params.id}</p>
    </div>
  );
};

export default ProductDetailPage;

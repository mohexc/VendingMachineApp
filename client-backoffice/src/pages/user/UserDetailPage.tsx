import React, { FC } from "react";
import { useParams } from "react-router-dom";
interface ParamsInterface {
  id: string;
}
const UserDetailPage: FC = () => {
  const params = useParams<ParamsInterface>();

  return (
    <div>
      UserDetailPage
      <p>{params.id}</p>
    </div>
  );
};

export default UserDetailPage;

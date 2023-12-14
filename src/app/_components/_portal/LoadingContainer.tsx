import {LoadingState} from "@/utils/atom";
import React from "react";
import {useRecoilValue} from "recoil";
import Loading from "../_portalItem/Loading";
import LoadingPortal from "./LoadingPortal";
function LoadingContainer() {
  const isLoading = useRecoilValue(LoadingState);

  return <LoadingPortal>{isLoading && <Loading />}</LoadingPortal>;
}

export default React.memo(LoadingContainer);

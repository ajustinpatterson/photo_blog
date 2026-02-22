import loading from "./loading.module.css";
import * as labels from "../../../master.json";

export default function Loading() {
  return (
    <span className={loading.bar}>
      <p>{labels.loading.loadMorePhotoInfoblurb}</p>
    </span>
  );
}

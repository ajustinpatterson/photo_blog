import photocaption from "./photocaption.module.css";
// TODO:
// change font
// only show if caption info
export default function PhotoCaption({
  caption,
}: Readonly<{ caption: string }>) {
  return <div className={photocaption.photocaption}>{caption}</div>;
}

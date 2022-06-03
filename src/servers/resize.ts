import FileResizer from "react-image-file-resizer";

// 이미지 리사이징 CustomHook
export const resizeFile = (file: Blob, x: number, y: number, type: string) =>
  new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      x,
      y,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      type
    );
  });

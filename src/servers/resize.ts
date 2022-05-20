import FileResizer from "react-image-file-resizer";

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

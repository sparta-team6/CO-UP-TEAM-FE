import FileResizer from "react-image-file-resizer";

export const resizeFile = (file: Blob) =>
  new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      100,
      100,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

export type Column<T> = {
  heading: string;
  minWidth?: string;
  /* Consider to keep this, if only two type of image or text we can add prop like isImage
   type?: string;
  */
  value: keyof T;
  isAction?: boolean;
};

export type ColumnHeadingProps = {
  name: string;
};

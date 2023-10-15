export const urlToBlob = async (pdfUrl: string): Promise<Blob> => {
  const response = await fetch(pdfUrl);
  const blob = await response.blob();
  return blob;
};

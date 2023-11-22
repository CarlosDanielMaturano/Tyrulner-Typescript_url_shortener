import QRCode from 'qrcode';

const genQrDataBuffer = async (data: string): Promise<string | null> => {
  try {
    const bufData = await QRCode.toDataURL(data);
    return bufData;
  } catch (err: unknown) {
    console.trace(err);
    return null;
  }
};

export default genQrDataBuffer;

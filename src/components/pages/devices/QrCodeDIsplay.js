export default function QRCodeDisplay({ qrCode }) {
    return qrCode ? <pre>{qrCode}</pre> : null;
  }
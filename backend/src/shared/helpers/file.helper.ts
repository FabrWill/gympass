export default class FileHelper {
  static fileToBase64(stream: NodeJS.ReadableStream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer.toString('base64'));
      });
    });
  }
}

const isImage = (buffer: Buffer): boolean => {
    const header = buffer.toString('hex', 0, 4);
    switch (header) {
        case 'ffd8ffe0': // JPEG
        case 'ffd8ffe1': // JPEG
        case '89504e47': // PNG
        case '47494638': // GIF
            return true;
        default:
            return false;
    }
}
export default isImage;
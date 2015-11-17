export default (length: number) => {
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let id = '';
    for (let i = 0; i < length; i++) {
        id += CHARS[Math.random() * CHARS.length | 0];
    }
    return id;
}
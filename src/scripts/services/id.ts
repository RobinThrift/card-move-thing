export default (length: number) => {
	let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
	var id = '';
	for (var i = 0; i < length; i++) {
		id += chars[Math.random() * chars.length | 0];
	}
	return id;
}
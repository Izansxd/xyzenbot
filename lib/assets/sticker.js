/*
    * Created By xyzendev
    * License MIT
    * My Contact wa.me/6289513081052
*/

const { Sticker } = require("wa-sticker-formatter")

const createSticker = (img, url, packName, authorName, quality) => {
	let stickerMetadata = {
		type: 'full',
		pack: packName,
		author: authorName,
		quality
	}
	return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}

module.exports = createSticker
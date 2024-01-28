const fs = require('fs')
const BodyForm = require('form-data');
const ffmpeg = require('fluent-ffmpeg');
const axios = require('axios');
const cheerio = require('cheerio')

function convert(buffer, audioOptions, videoOptions, outputFormat, outputPath = null) {
  return new Promise((resolve, reject) => {
    const command = ffmpeg(buffer);

    if (audioOptions) {
      command.audioCodec(audioOptions.codec);
      command.audioBitrate(audioOptions.bitrate);
      command.audioFrequency(audioOptions.frequency);
    }

    if (videoOptions) {
      command.videoCodec(videoOptions.codec);
      command.videoBitrate(videoOptions.bitrate);
      command.videoCRF(videoOptions.crf);
      command.videoPreset(videoOptions.preset);
    }

    command.toFormat(outputFormat);

    if (outputPath) {
      command.on('end', () => {
        console.log('Conversion finished');
        resolve();
      });
      command.on('error', (err) => {
        console.error('Error:', err);
        reject(err);
      });

      command.save(outputPath);
    } else {
      command.on('end', () => {
        console.log('Conversion finished');
        const convertedBuffer = command._response;
        resolve(convertedBuffer);
      });
      command.on('error', (err) => {
        console.error('Error:', err);
        reject(err);
      });

      command.toFormat('wav');
      command.pipe();
    }
  });
}

async function toAudio(buffer, ext, outputPath) {
  await convert(buffer, { codec: 'libmp3lame', bitrate: '128k', frequency: 44100 }, null, 'mp3', outputPath);
}

async function toPTT(buffer, ext, outputPath) {
  await convert(buffer, { codec: 'libopus', bitrate: '128k' }, null, 'opus', outputPath);
}

async function toVideo(buffer, ext, outputPath) {
  await convert(buffer, { codec: 'libx264', bitrate: null, crf: 32, preset: 'slow' }, { codec: 'aac', bitrate: '128k' }, 'mp4', outputPath);
}


function webp2mp4file(path) {
	return new Promise((resolve, reject) => {
		const form = new BodyForm()
		form.append('new-image-url', '')
		form.append('new-image', fs.createReadStream(path))
		axios({
			method: 'post',
			url: 'https://s6.ezgif.com/webp-to-mp4',
			data: form,
			headers: {
				'Content-Type': `multipart/form-data; boundary=${form._boundary}`
			}
		}).then(({
			data
		}) => {
			const bodyFormThen = new BodyForm()
			const $ = cheerio.load(data)
			const file = $('input[name="file"]').attr('value')
			bodyFormThen.append('file', file)
			bodyFormThen.append('convert', "Convert WebP to MP4!")
			axios({
				method: 'post',
				url: 'https://ezgif.com/webp-to-mp4/' + file,
				data: bodyFormThen,
				headers: {
					'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
				}
			}).then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
				resolve({
					status: true,
					message: "Xeorz",
					result: result
				})
			}).catch(reject)
		}).catch(reject)
	})
}
module.exports = {
  toAudio,
  toPTT,
  toVideo,
  webp2mp4file
}
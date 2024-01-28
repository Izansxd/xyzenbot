/* 
    * Created By XyzenDev & AdrianDev
*/

const axios = require('axios');
const cheerio = require('cheerio');

async function cekhost(url) {
    try {
        const response = await axios.get('https://check-host.net/ip-info?host=' + url);
        const $ = cheerio.load(response.data);
        const result = { status: 200, creator: 'xyzendev', url: url, ip: '', hostName: '', isp: '', organization: '', country: '' };

        $('div > div > div > div > table > tbody > tr').each((index, element) => {
            const label = $(element).find('td').eq(0).text().trim();
            const value = $(element).find('td').eq(1).text().trim();

            switch (label) {
                case 'IP address':
                    result.ip = value;
                    break;
                case 'Host name':
                    result.hostName = value;
                    break;
                case 'ISP':
                    result.isp = value;
                    break;
                case 'Organization':
                    result.organization = value;
                    break;
                case 'Country':
                    result.country = value;
                    break;
            }
        });
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = cekhost
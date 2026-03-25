const fetch = require('node-fetch');

const parseArgs = require('minimist');

const readConfig = async () => {
	// 读取配置文件的逻辑
};

const sendRequest = async (method, url, headers, body) => {
	const options = {
		method,
		headers,
		body: method === 'GET' ? null : body
	};

	try {
		const response = await fetch(url, options);
		return response;
	} catch (error) {
		throw error;
	}
};

const formatResponse = (response) => {
	return response.json();
};

const saveResponseToFile = async (response, filePath) => {
	const content = JSON.stringify(response, null, 2);
	await write_file(content, filePath);
};

module.exports = {
	parseArgs,
	sendRequest,
	formatResponse,
	saveResponseToFile
};
import { Meteor } from 'meteor/meteor';
import { headers } from 'meteor/gadicohen:headers';
import Axios from 'axios';
import dns from 'dns';

var accessToken;
var sessionId;
const urlRegex = /([a-z0-9]+):\/\/([a-z0-9\.]+):([\d]+)/;
const testUrl = 'http:/35.192.197.33/primaries/AspiringZealotPrimary.jpeg';

if (Meteor.isServer) {
	Meteor.methods({
		"sandstorm.submitClaimToken"(claimToken) {
			const self = this;
			console.log(`claimToken = ${claimToken}`);
			sessionId = headers.get(self, 'x-sandstorm-session-id');
			console.log(`sessionId = ${sessionId}`);
			if (Meteor.isServer) {
				getAccessToken(claimToken);
			} else {
				console.log('getting access token')
			}
		},

		"sandstorm.fetchImage"() {
			if (Meteor.isServer) {
				fetchImage(accessToken);
			} else {
				console.log('fetching image');
			}

		}
	})
}

function getAccessToken(claimToken) {
	const proxyParsed = process.env.HTTP_PROXY.match(urlRegex);
	const requestData = JSON.stringify({
		"requestToken": claimToken,
		"requiredPermissions": [],
	});
	var resData = "";
	Axios({
		proxy: {
			protocol: proxyParsed[1],
			host: proxyParsed[2],
			port: Number(proxyParsed[3]),
		},
		method: "POST",
		url: `http://http-bridge/session/${sessionId}/claim`,
		data: {
			"requestToken": claimToken,
			"requiredPermissions": [],
		}
	})
	.then(function(response) {
		console.log('setting access token');
		console.log(response.data);
		accessToken = response.data.cap;
	})
	.catch((error) => {console.error(error)})

};

function fetchImage(accessToken) {
	/*
	dns.lookup('sot-images.sweetvinesystems.com', function(err, address, family) {
		if (err) {
			console.log("Error: " + err);
		} else {
			console.log(address);
		}
	});
	*/
	if (!accessToken) return;
	console.log("fetchImage");
	console.log(accessToken);
	const proxyParsed = process.env.HTTP_PROXY.match(urlRegex);
	Axios({
		/*
		proxy: {
			protocol: proxyParsed[1],
			host: proxyParsed[2],
			port: Number(proxyParsed[3]),
		},
		*/
		method: 'GET',
		url: testUrl,
		headers: {'Authorization': `Bearer ${accessToken}`}
	})
	.then((response => {
		console.log('successful response');
		console.log(response.data.length);
	}))
	.catch((error) => {
		console.log(error.message);
	});
}
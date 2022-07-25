const helper = require('../helper');
const Campaign = require('./Campaign');
const Node = require('./Node');

module.exports = {
	async get(cid, txid) {
		let query = new Parse.Query("Transaction");
		query.equalTo("campaign", cid);
		query.equalTo("txid", txid);
		return query.first({ useMasterKey: true });
	},
	async createTransaction(req) {
		let { cid, txid, nodeRef } = req.params;
		if ( !nodeRef ) return Promise.reject(new Parse.Error(Parse.Error.SCRIPT_FAILED, "INVALID_NODE"));

		let campaignRef = await Campaign.get(cid)
		if ( !campaignRef || !campaignRef.get('active') ) return Promise.reject(new Parse.Error(Parse.Error.SCRIPT_FAILED, "INVALID_CAMPAIGN"));

		try {
			let existsTrans = await this.get(campaignRef, txid);
			if ( existsTrans ) return Promise.reject(new Parse.Error(Parse.Error.SCRIPT_FAILED, "TX_ACTIVATED"));
		} catch(e) {
			console.log({createTransaction: e})
		}

		if ( txid.indexOf('|')>0 ) {
			let [iv, content] = txid.split('|')
			let message = helper.decrypt({iv, content})
			let now = helper.now()
			let [cid2, now2, uid2] = message.split(',')
			console.log("Hello", message, req)
			if ( cid!=cid2 ) // 3 hours
				return Promise.reject(new Parse.Error(Parse.Error.SCRIPT_FAILED, "INVALID_TRANSACTION")); // check user ****
			else if ( now-parseInt(now2)>3*60*60 )
				return Promise.reject(new Parse.Error(Parse.Error.SCRIPT_FAILED, "CODE_EXPIRED")); // check user ****
		} else {
			// call 3rd party api to verify txid *****
		}
	
		const Transaction = Parse.Object.extend("Transaction");
		let trans = new Transaction();
		trans.set("node", nodeRef);
		trans.set("txid", txid);
		trans.set("campaign", campaignRef);
		trans.set("user", req.user);

		return trans.save(null,{ useMasterKey: true }).then(res => ({ id: res.id }));
	}
}

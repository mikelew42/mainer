var log = App.utils.log.copy();

log.log("file loaded");

$(function(){
	log.log("document.ready");

	log.log('yo');
	log.log({ test: 123, nestedObj: { yerp: true } });
	App.tabs.add({
		log: log.render()
	});
	log.log('hmm');
	log.log('testing');
	log.log('testing');
});
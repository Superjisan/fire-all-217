$(document).ready(() => {
	assholes.forEach(asshole => {
		$('.pricks-col .list-group').append(generateAssholeHTML(asshole))
	});

	$('.list-group a').on('click', e => getCongressPerson(e));
});

const generateAssholeHTML = asshole => {
	let html = `<a href="#" class="list-group-item" id="${asshole.district}" name="${asshole.name}" state="${asshole.state}" district-num="${asshole.districtNum}">
   		<div class="thumbnail">
   			<img src="${asshole.img_url}" alt="img_${asshole.name}" />
   		</div>
   		<h4 class="list-group-item-heading">${asshole.name}</h4>
		<p class="list-group-item-text">${asshole.district}</p>
	</a>`;
	return html
};

const getCongressPerson = event => {
	let elem;
	if ($(event.target).hasClass('list-group')) {
		elem = event.target
	} else {
		elem = $(event.target).parent('.list-group-item');
	}
	let name = $(elem).attr('name');
	let district =  $(elem).attr('district-num');
	let state = $(elem).attr('state');
	const url = `https://congress.api.sunlightfoundation.com/legislators?state=${req.params.state}&district=${req.params.district}&apiKey=jzthegreat@gmail.com`;
	$.get(url, data => {
		console.log(data);
	});
} 
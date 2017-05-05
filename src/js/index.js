$(document).ready(() => {
	assholes.forEach(asshole => {
		$('.pricks-col .list-group').append(generateAssholeHTML(asshole))
	});

	$('.list-group-item').on('click', e => getCongressPerson(e));
    $('#random').click(renderRandomAsshole);
});

const generateAssholeHTML = asshole => {
	let html = `<a href="#" class="list-group-item" id="${asshole.district}" name="${asshole.name}" state="${asshole.state}" district-num="${asshole.districtNum}" img-url="${asshole.img_url}">
   		<div class="row">
            <div class="col-xs-4">
                <img class="asshole_img" src="${asshole.img_url}" alt="img_${asshole.name}" />
            </div>
            <div class="col-xs-8">
                <h4 class="list-group-item-heading">${asshole.name}</h4>
                <p class="list-group-item-text">${asshole.district}</p>
            </div>
        </div>
	</a>`;
	return html
};

const getCongressPerson = event => {
	let elem;
	if ($(event.target).hasClass('list-group-item')) {
		elem = event.target
	} else {
		elem = $(event.target).closest('.list-group-item');
	}
	let name = $(elem).attr('name');
	let district =  $(elem).attr('district-num');
	let state = $(elem).attr('state');
    let imgUrl = $(elem).attr('img-url')
    getCongressPersonDataAndRender(district, state, imgUrl);
}

const getCongressPersonDataAndRender = (district, state, imgUrl) => {
    const url = `https://congress.api.sunlightfoundation.com/legislators?state=${state}&district=${district}`;
    $.get(url, ({results}) => {
        let data = results[0];
        $('.asshole_rep').removeClass('hidden');
        let $assholeRepElem = $('.asshole_rep .panel-body.row');
        $assholeRepElem.empty();
        $assholeRepElem.append(generateLegislatorsForCongress(data, imgUrl))
    });
}

const generateLegislatorsForCongress = (data, photoUrl) => {
    const photoUrlHtml =  `src="${photoUrl}"`;
    const html = `
        <div class="legislator-img-col col-xs-12 col-sm-12 text-center">
            <a href="#" class="thumbnail asshole_thumbnail">
                <img ${photoUrlHtml}/>
            </a>
        </div>
        <div class="col-xs-12 col-sm-12">
            <p class="text-center legislator-name">
                <a href="${data.website}" target="_blank" >
                    ${data.first_name} ${data.last_name}
                </a>
            </p>
            <p class="text-center legislator-state">
                <strong>State:</strong> ${data.state_name}</p>
            ${data.district ? `<p class="text-center legislator-district">
                <strong>District:</strong> ${data.district}
            </p>`: ''}
            ${generateAddressForCongress(data)}
            ${generatePhoneForCongress(data)}
            ${generateSocialMediaForCongress(data)}
        </div>`;
    return html;
};

const generateSocialMediaForCongress = data => {
    const twitterHtml = data.twitter_id ? `<a class="btn btn-default btn-block" href="https://twitter.com/${data.twitter_id}" target="_blank">
        <i class="fa fa-twitter"></i>
        Tweet @ their behind
    </a>` : '';
    const facebookHtml = data.facebook_id ? `<a class="btn btn-default btn-block" href="https://www.facebook.com/${data.facebook_id}" target="_blank">
        <i class="fa fa-facebook"></i>
        Leave a comment on their Facebook Page</a>` : '';
    return `<p class="text-center legislator-socialmedia">
        ${twitterHtml}
        ${facebookHtml}
    </p>`;
};

const generateAddressForCongress = data => {
    return `<p class="text-center legislator-address">
        <strong>Address:</strong>
        ${data.office}, Washington DC, 20003
    </p>`;
};

const generatePhoneForCongress = data => {
    const phone = data.phone;
    return `<p class="text-center legislator-phone">
        <a class="btn btn-default btn-block" href="tel:${phone.replace(/-/g, '')}">
            <i class="fa fa-phone"></i>
            Call this sleazy dimwit
        </a>
    </p>`;
};

const renderRandomAsshole = () => {
  let min = Math.ceil(0);
  let max = Math.floor(270);
  let randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
  let asshole = assholes[randomIndex];
  const {districtNum, state, img_url} = asshole;
  getCongressPersonDataAndRender(districtNum, state, img_url);
}
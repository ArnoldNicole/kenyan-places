const locationsDiv = document.getElementById('locations');
const select = document.getElementById('county');
const subcounty = document.getElementById('subcounty');
const ward = document.getElementById('ward');

let url = 'https://raosys.com/js/kenyan_county_sub_county_ward.json';
const xhr = new XMLHttpRequest();
var locationsData = {
    counties: [],
    sub_counties: [],
    wards: []
}

// /var data = {};
getData(url);

// Select County
select.addEventListener('change', function (e) {
    let i = locationsData.counties.findIndex(county => county.id == e.target.value)
    if (i != -1) {
        while (subcounty.firstChild) {
            subcounty.removeChild(subcounty.firstChild);
        }
        addOptions(locationsData.counties[i], subcounty)

    }
})

async function getData(url) {
    let res = await fetch(url);
    let data = await res.json();
    locationsData.counties = data.counties;
    locationsData.sub_counties = data.sub_counties;
    locationsData.wards = data.wards;


    locationsData.counties.forEach(county => {
        var opt = document.createElement('option');
        opt.text = `${county.name}`;
        opt.value = `${county.id}`
        select.appendChild(opt);
        // let opt = `< option value = "${county.id}" > ${ county.name }</option > `;
        // select.innerHTML = (opt);
    });
}

function addOptions(county, select) {
    locationsData.sub_counties.forEach(subcounty => {
        if (subcounty.county == county.id) {
            let opt = document.createElement('option');
            opt.text = `${subcounty.name}`;
            opt.value = `${subcounty.id}`
            select.appendChild(opt);
            select.style.display = ""
        }
    });

}





// fetch(url)
//     .then((response) => {
//         return response.json()
//     })
//     .then((data) => {
//         // Work with JSON data here
//         counties = data.counties

//     })
//     .catch((err) => {
//         // Do something for an error here
//     })
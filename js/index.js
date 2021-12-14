const locationsDiv = document.getElementById('locations');
const select = document.getElementById('county');
const subcounty = document.getElementById('subcounty');
const ward = document.getElementById('ward');

let url = 'https://raosys.com/js/kenyan_county_sub_county_ward.json';
var locationsData = {
    counties: [],
    sub_counties: [],
    wards: []
}


getData(url);

// Select Sub- County
select.addEventListener('change', function (e) {
    ward.style.display = 'none';
    subcounty.style.display = 'none';
    let i = locationsData.counties.findIndex(county => county.id == e.target.value)
    if (i != -1) {
        while (subcounty.firstChild) {
            subcounty.removeChild(subcounty.firstChild);
        }
        addOptions(locationsData.counties[i], subcounty)
    }
})

// Select WARD
subcounty.addEventListener('change', function (e) {
    let i = locationsData.sub_counties.findIndex(sub_county => sub_county.id == e.target.value)
    // console.log(i);
    if (i != -1) {
        while (ward.firstChild) {
            ward.removeChild(ward.firstChild);
        }
        addWardOptions(locationsData.sub_counties[i], ward)
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

function addWardOptions(subcounty, ward_div) {
    locationsData.wards.forEach(sel_ward => {
        if (sel_ward.sub_county == subcounty.id) {
            let opt = document.createElement('option');
            opt.text = `${sel_ward.name}`;
            opt.value = `${sel_ward.id}`
            ward_div.appendChild(opt);
            ward_div.style.display = ""
        }
    });
}

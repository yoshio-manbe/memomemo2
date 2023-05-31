
$("#check").click(function(){
    for (let i = 1; i <= 5; i++) {
        const human = $("#member" + i).val();
        console.log(human);
        const sub = $("#memo" + i).val();
        console.log(sub);
        const myObj = {
            name: human,
            memo: sub
        };
        localStorage.setItem("myData" + i, JSON.stringify(myObj));
    }
})

$(document).ready(function() {
    // ページの読み込み時に保存されたデータを取得して表示する
    for (let i = 1; i <= 5; i++) {
        const storedData = JSON.parse(localStorage.getItem("myData" + i));
        if (storedData) {
        $("#member" + i).val(storedData.name);
        $("#memo" + i).val(storedData.memo);
    }
    }
})

var map = L.map('map').setView([43.074954, 141.314049], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
}).addTo(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("クリックした位置の緯度経度は " + e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick);


var features = [];
var place = [{
    "name": "よしおマンション",
    "lat": "43.0758162",
    "long": "141.317418",
    "html" : "<button id='y-m-button'>「よしおマンション」の詳細</button>"
}, {
    "name": "よしおアパート",
    "lat": "43.076004",
    "long": "141.311216",
    "html" : "<button id='y-a-button'>「よしおアパート」の詳細</button>"
}, {
    "name": "メゾンよしお",
    "lat": "43.0755",
    "long": "141.31555",
    "html" : "<button id='y-z-button'>「メゾンよしお」の詳細</button>"
}, {
    "name": "よしおンズマンション",
    "lat": "43.0735",
    "long": "141.31355",
    "html" : "<button id='y-n-button'>「よしおンズマンション」の詳細</button>"
}, ]
// GeoJSON形式で複数個のマーカーを設定する
for (var i = 0; i < place.length; i++) {
    features.push({ 
    "type": "Feature",
    "properties": {
    "name": place[i].name,
    "html": place[i].html
    },
    "geometry": {
    "type": "Point",
    "coordinates": [place[i].long, place[i].lat]
    }
});
}

$(document).ready(function() {
    var contentContainer = $("#content-container");

    L.geoJson(features, {
        onEachFeature: function(feature, layer) {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
            layer.on('mouseover', function(e) {
            this.openPopup();
        });
            layer.on('mouseout', function(e) {
            this.closePopup();
        });
            layer.on('click', function(e) {
            // HTMLを変更
            contentContainer.html(feature.properties.html);
        });
            layer.on('tap', function(e) {
            // HTMLを変更
            contentContainer.html(feature.properties.html);
        });
        }
    }
    }).addTo(map);
});

$(document).on('click', '#y-m-button, #y-a-button, #y-n-button, #y-z-button', function() {
    $("#slideshow-container").show();
    $(".sub").show();
});

const images = $('#slideshow-container img');
let counter = 0;
let index = 0;

images.eq(index).fadeIn();

$('#next').click(() => {
    images.eq(index).fadeOut(() => {
        index = (index + 1) % images.length;
        images.eq(index).fadeIn();
    });
});

$('#rev').click(() => {
    images.eq(index).fadeOut(() => {
        index = (index - 1 + images.length) % images.length;
        images.eq(index).fadeIn();
    });
});
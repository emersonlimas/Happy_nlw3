//Create map
const map = L.map('mapid').setView([-7.8720333,-34.9049149], 17);

//Create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);

//Create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68]
})

let marker;

//create and add markers
map.on('click', function(event) {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // remove icon
    marker && map.removeLayer(marker)

    //add icon Layer
    marker = L.marker([lat, lng], {icon})
    .addTo(map)
})

//add field photos
function addPhotoField() {
    //get photos container #images
    const container = document.querySelector('#images')
    //get container for duplicate .new-upload
    const fieldsContainer = document.querySelectorAll('.new-upload')
    //duplicate last photo add
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
    //validate the value of field
    const input = newFieldContainer.children[0]
    if(input.value == "") {
        return 
    }
    //clear field #images
    input.value = ""
    
    //add the duplicate photo in container of photos #images
    container.appendChild(newFieldContainer)
}

//function delete field
function deleteField(event) {
    const span = event.currentTarget
    const fieldsContainer = document.querySelectorAll('.new-upload')
    if(fieldsContainer.length <= 1) {
        span.parentNode.children[0].value = ""
        return
    }

    //delet the field
    span.parentNode.remove();
}

//change the yes for no
function toggleSelect(event) {
    //remove the class .active of the buttons
    document.querySelectorAll('.button-select button')
    .forEach(function(button) { 
        button.classList.remove('active')
    })
    //add the class .active
    const button = event.currentTarget
    button.classList.add('active')
    //actualize the input hidden with value selected
    const input = document.querySelector('[name="open_on_weekends"]')
    //verify if yes or no
    input.value = button.dataset.value
}

function validate(event) {
    //Validar se lat e lng estão preenchidos
    const lat = document.querySelector('[name="lat"]')
    if(lat.value == "") {
        alert('Você deve selecionar um ponto no mapa!')
        event.preventDefault()
    }
    
}
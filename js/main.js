var websiteName = document.getElementById("websiteName");
var websiteUrl = document.getElementById("websiteUrl");
var tBody = document.getElementById("tBody");
var validBox = document.getElementById('validBox');
var closeBtn = document.getElementById('closeBtn');
var websites;
if (localStorage.getItem('myWebsites')) {
    websites = JSON.parse(localStorage.getItem('myWebsites'));
    displayWebsites(websites);
} else {
    websites = [];
}
function addWebsite() {
    if (validateUrl(websiteUrl.value) && validateName(websiteName.value)) {
        var website = {
            websiteName: websiteName.value,
            websiteUrl: websiteUrl.value,
        };
        websites.push(website);
        localStorage.setItem('myWebsites', JSON.stringify(websites));
        displayWebsites(websites);
        clearForm();
    } else {
        validBox.classList.remove("d-none")

    }
}
function clearForm() {
    websiteName.value = '';
    websiteUrl.value = '';
}
function displayWebsites(arr) {
    var container = ``;
    for (var i = 0; i < websites.length; i++) {
        if (websites[i].websiteUrl.startsWith('www.')) {
            websites[i].websiteUrl = 'https://' + websites[i].websiteUrl;
        }
        container += ` <tr>
            <td>${i + 1}</td>
            <td>${websites[i].websiteName}</td>
            <td><a class="btn visBtn tableBtn" href="${websites[i].websiteUrl}" target="_blank"><i class="fa fa-eye pe-2"></i>Visit</a></td>
            <td><button class="btn delBtn tableBtn" onclick="deleteWebsite(${i})"><i class="fa fa-trash-can pe-2"></i>Delete</button></td>
            </tr>`
    }
    tBody.innerHTML = container;
}
function deleteWebsite(deleteIndex) {
    var deletedWebsite = websites.splice(deleteIndex, 1);
    localStorage.setItem('myWebsites', JSON.stringify(websites));
    displayWebsites(websites);
}
function validateUrl(url) {
    // var regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
            
    var regex = /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z\d\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,}\W?)?$/g;
    if (regex.test(url)) {
        websiteUrl.classList.replace('is-invalid', 'is-valid')
        return true;
    } else {
        websiteUrl.classList.add('is-invalid')
        return false;
    }
}
function validateName(name) {
    var regex = /\w{3,}/g;
    if (regex.test(name)) {
        websiteName.classList.replace('is-invalid', 'is-valid')
        return true;
    } else {
        websiteName.classList.add('is-invalid')
        return false;
    }
}
closeBtn.addEventListener('click', function () {
    validBox.classList.add("d-none")
})
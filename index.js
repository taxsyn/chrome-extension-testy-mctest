const domainList = document.querySelector('#domain');
const customDomainTextBox = document.querySelector('#customDomain');
const customDomainWrapper = document.querySelector('#customDomainWrapper');
const prefixTextBox = document.querySelector('#emailPrefix');

const changeDomainInput = () => {

    const selectedDomain = domainList.value;
    let customDomain = customDomainTextBox.value;
    
    customDomainWrapper.style.display = selectedDomain === "custom" ? "block" : "none";

    let emailDomain = selectedDomain === "custom" ? customDomain : selectedDomain;
    chrome.storage.sync.set({selectedDomain: selectedDomain, customDomain: customDomain, emailDomain: emailDomain}, function() {
    });
    anyChange();
}

const changeCustomDomain = () => {

    const selectedDomain = domainList.value;
    let customDomain = customDomainTextBox.value;
    let emailDomain = selectedDomain === "custom" ? customDomain : selectedDomain;

    chrome.storage.sync.set({customDomain: customDomain, emailDomain: emailDomain}, function() {
    });
    anyChange();
}

const changePrefix = () => {

    let emailPrefix = prefixTextBox.value;

    chrome.storage.sync.set({emailPrefix: emailPrefix});
    anyChange();
}

const anyChange = () => {
    const date = new Date();
    const timeStamp = date.getFullYear() + String(date.getMonth() + 1).padStart(2, '0') + String(date.getDate()).padStart(2, '0') + date.getHours() + date.getMinutes() + date.getSeconds();

    chrome.storage.sync.get(['emailDomain', 'emailPrefix'], function(result) {

        let emailPrefix = result.emailPrefix ? result.emailPrefix : "";
        let emailDomain = result.emailDomain ? result.emailDomain : "gmail.com";
    
        const testEmail = emailPrefix + timeStamp + "@" + emailDomain;

        document.querySelector('#example').innerText = testEmail;
        
      });
}

domainList.onchange = changeDomainInput;
customDomainTextBox.onchange = changeCustomDomain;
prefixTextBox.onchange = changePrefix;

chrome.storage.sync.get(['selectedDomain', 'customDomain', 'emailPrefix'], function(result) {
    domainList.value = result.selectedDomain;
    customDomainTextBox.value = result.customDomain ? result.customDomain : null;
    prefixTextBox.value = result.emailPrefix ? result.emailPrefix : null;
    customDomainWrapper.style.display = result.selectedDomain === "custom" ? "block" : "none";
    anyChange();
});

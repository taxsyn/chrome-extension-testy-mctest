const insertEmail = () => {
  const date = new Date();
  const timeStamp = date.getFullYear() + String(date.getMonth() + 1).padStart(2, '0') + String(date.getDate()).padStart(2, '0') + date.getHours() + date.getMinutes() + date.getSeconds();

  chrome.storage.sync.get(['emailDomain', 'emailPrefix'], function(result) {

    const testEmail = result.emailPrefix + timeStamp + "@" + result.emailDomain;
  
    document.activeElement.value = testEmail;
    
  });
}

if (!window.firstTimeExecuted) {
  window.firstTimeExecuted = true;
  chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
    if (data.msg == 'insertEmail') {
      insertEmail();
    }
  });
}
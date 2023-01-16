var contextMenuItem = {
    "id": "testyMcTest",
    "title": "Insert Test Email",
    "contexts": ["editable"]
  };
chrome.contextMenus.create(contextMenuItem); 
  
chrome.contextMenus.onClicked.addListener(function(clickData) {
  if (clickData.menuItemId === "testyMcTest") {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { msg: "insertEmail"})
    })
    
  }
})
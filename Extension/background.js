// background.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.type == 'google') {
        // WARNING: SECURITY PROBLEM - a malicious webpage may abuse
        // the message handler to get access to arbitrary cross-origin
        // resources.
        var url = "https://"+ request.current_host + "/scholar?q=info:" + request.info_id + ":scholar.google.com/&output=cite&scirp=0&hl=zh-CN";
        fetch(url, {
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
              'user-agent': request.user_agent,
              "accept-encoding": "gzip, deflate, br",
              "accept-language": "zh-CN,zh;q=0.9",
              "sec-ch-ua-mobile": "?0",
              "sec-fetch-site": "same-site",
            },
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'client', // *client, no-referrer
        }).then(response => response.text())
          .then(text => sendResponse(text))
          .catch(error => console.log('g_error' + error))
        return true;  // Will respond asynchronously.
      }
      else if (request.type == 'if_api') {
        var url = "https://api.scholarscope.cn/getsinglesearch.php";
        fetch(url, {
            credentials: 'omit', // include, same-origin, *omit
            body: 'jrnl='+request.publication_name+'&',
            headers: {
              "user-agent": request.user_agent,
              "accept-encoding": "gzip, deflate, br",
              "accept-language": "zh-CN,zh;q=0.9",
              "sec-ch-ua-mobile": "?0",
              "sec-fetch-site": "same-site",
              "origin": "https://www.scholarscope.cn",
              "content-type": "application/x-www-form-urlencoded"
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'client', // *client, no-referrer
        }).then(response => response.text())
          .then(text => sendResponse(text))
          .catch(error => console.log('i_error' + error))
        return true;
      }
});
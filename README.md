# ohio
REST API to forward `http GET` requests to `https`.

Modern browsers by defualt blocks `XHR` to unsecured(http) URLs from secured(https) URLs. So, this is an API to forward http GET requests to https. 

It is written in `Node.js` using `express` server. It is using REDIS database hosted on _redis labs_. It is deployed on _wedeploy_ using `docker`.

The idea came when I was working on a project using a certain API which was only in http. But I really liked that API and could not find any other method to forward it to https. So I made this tool to overcome this difficulty.

The API is deployed on following link - https://ohio-spooderman.wedeploy.io

__API Description is in below image.__

![API Description](https://i.imgur.com/2IesDFs.jpg)
> The data in POST request to Add Link is sent as `x-www-form-urlencoded`. Key value pair is 'link = {value}'.

### Screenshots

![View Link](https://i.imgur.com/Fq5nhbh.png)
![Forward Saved Link](https://i.imgur.com/qlBXUOj.png)
![Chrome forwarded Link](https://i.imgur.com/4RT6TPQ.png)
![ADD Link](https://i.imgur.com/QojpcL2.png)
![Bad Link](https://i.imgur.com/zAAQS9m.png)
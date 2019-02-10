# ohio
REST API to forward `http GET` requests to `https`.

Modern browsers by defualt blocks `XHR` to unsecured(http) URLs from secured(https) URLs. So, this is an API to forward http GET requests to https. 

It is written in `Node.js` using `express` server. It is using REDIS database hosted on _redis labs_. It is deployed on _wedeploy_ using `docker`.

The API is deployed on following link - https://ohio-spooderman.wedeploy.io

__API Description is in below image.__

![API Description](https://i.imgur.com/2IesDFs.jpg)

### Screenshots

![View Link](https://i.imgur.com/Fq5nhbh.png)
![Forward Saved Link](https://i.imgur.com/qlBXUOj.png)
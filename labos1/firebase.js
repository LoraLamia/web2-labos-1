import admin from 'firebase-admin';

const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "labos1-66e00",
        "private_key_id": "2f1424cf975cf53984a96c80ea7aa56e874ded8a",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDE5SUjASKUJMz3\n3jd1HBGiF8VxcFSObGvQGs5tmuemIWufomGrjyQcRqQoYUFdyrcrYIeJCr4fCUSj\ntN745YTfYtYb7XHAlNtg2j/zZNhe+c0cH18ZZkOWEfgCtxnmk0UEIaprjEqu2pyX\naQsmHxmZJFEW0ghMiyCpTV9qRJk7UV6Xd7rdMBlc2KWOrTRpBVKfBOxneApm8wGK\nuPVVUHQIfeqIUfYBPKFW5spjvhjG3t/OODDYYbB2xJAV3XsIu3HRmveNbWAAtApb\n4fhDj5bAji7jcgu9qC0DoIilNES2jiz8nt7fZKdwcmrBXiwQdBqdHo+ba+jFUQtj\n6n/JHdt3AgMBAAECggEAQbtaHYiIebqbbviRvRgEzv9unANrRyztBUmdtrurMCwi\nGOYGA1dDL+lpbk2hm+VMJ0APn3GlrQjUEG8WrTM6m7UMU8B+ZFONtZTHGsOE9Jgi\noIvcnMcmMxiGmql0DSUHOmzezw7D9AHpmyanYS+qxRR5ucuel6cu3TaGbxy9py5Z\n9PG37+9i10/tRmpPv9gJ3uqRqvtAlZj+pFVL+LEyUxptSw5bdKg6ed/mSaCwefat\n32DkqDRYdfYGh/GHBVV840OROn6PWcGx3THeCrWB430kRWZp/AbnGNr8nmkevyoB\nZVZdWxM8wSMc4egwDgxRnmUWa2+4/rs4gfr/BiYvEQKBgQDsEm8KecYzsL6NGa1Y\n7sHdlOdmG/VEAiHgWzUeByJg+6HcJ18llzmbYKTWn+nTASoFKDlbeJau0TLwZKVD\n9APpX9YHy8DgobRt2OMjrhBVPMmvWv6Ro1Gdi0WQUdn5Nu7djEdDndisLfQPZQaX\nq50vGDacAiOAecYYe/Z6QQ2oSQKBgQDVhBcJFXWusbKViKBaqZ5pAv8DlG4+y8PG\nvDeDgUZpZeSsygBqgywLYM/JUf5A5avGuK8pszsUbzyZwqcpaoYnQtsUivm2X1lW\nQAwMqKUNzy2nw/PyQ5ud2mgIv65W3ki07UYJG+MPamsA7/UhWYVDu/YckYwIUgu8\nYNzOrUTlvwKBgA+Dqp6CoD73Z554SIcmscDxLz/rqHO+vCE1fUkq6Nx8zQdd4wfi\nZ1vJvyuHuOMwGWXbXeGgDC8S+okH5ECSAcvNi5BZmKRqnCP38/19S/9+DjcjAMXr\neMqkw36Xkn6pWItg07Ii5oFyR67XUdaX5a2ZpsUb8t9XoWgshWdFbTNZAoGBAK8H\npUqRCPO4P8lNQwaPXYiAKETq/KUFrOvRh0CKTQpBuP/caBLojMaXCj7itCbHH9W7\nt/vbLWdG+MqjQx00cdzldWqVsrbJ2xZVUoteBFAZsjeA7w1+VqdET1w8pdIYTkni\n6DK3ZZ9RgX43Nx+rnw8zmkE5Hy4C9BPs45WZfI1JAoGBAMM7ctcNTrxCVEn/wDwi\nNhjeEFfmeytp+VhG211o+bOeQv+1VWEfIuPzjWzAsDAvX/aZWfIawwrAZdpPoAcN\nLpgWngq6a3uK3vr4zQghjxt9z2cAkER4F1apcIkPA3svDZ79L2tqEEsZ5eXrXKkO\nY2Qgn5dOfIYbF84s8qI78YLa\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-apcox@labos1-66e00.iam.gserviceaccount.com",
        "client_id": "110948354918734974660",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-apcox%40labos1-66e00.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
    })
})

export default firebaseApp;
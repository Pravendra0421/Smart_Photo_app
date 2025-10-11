import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccount: ServiceAccount = {
  projectId: "smartphotoapp-8f238",
  clientEmail:
    "firebase-adminsdk-fbsvc@smartphotoapp-8f238.iam.gserviceaccount.com",
  privateKey:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDBx2oKQwMw1RSN\nN2nyDYr3zPT0CbAYEtGoJehTNRWHuhe3VO1/FoCZsueVbq+tl26yQ2cFwP9FfYyV\n6oLj034wcRZdJnhACmnXfaFO2z01kbnw1cRJC9AFjQPWjFUWPFn25b6rzhTzOu45\nYUnzAPqU5M0+6kclbukY0JoXUiWsolIl9BmcGbBeYTxmMFVPXhXV6RxYuqTYcuiC\nZSUyfV+ryZlB3v/GPnger9Ep+HR+Nq/3c4rlr/4PSr830IsOmnwZrAEiHLKm+7GL\nmuac7Y7dQNm2W9FmvfYpSNu83WvhuMJM/b0yrWOWkjV6Orgi7g9BsGx8ql9sBF9t\nrA+LTprJAgMBAAECggEAB0Ko+vRy0KgTKo1ad1rBi7JOtTwNsIE4AMRW1ZNGGL1E\nuTZB5cKak+ernKI2i9sCJ0S2PfVyuxBOralJOS8J6de63kecNs4NFCldW16EhxbM\nMDVaMuBx7VtQuv+sCna9ai5GfBpvF4PsPBMkmam+Ocju1b4iZ0kmC6t5Mol95t9n\nU44IY5+Ap/iL+4AiYVCU5X6ZzyebXQDrQcz8nZppQSIlqn+8993hcLOfi1lifzq9\n/JFVLT+eu7QRHdd+1s+idqF0b89itT05lWQHDEvQw2wlnoRn879X9hVieQu5Gd0/\netax+rgxeH2gwJB6giL/wPZ75vIabu8q1mpg1ffUmQKBgQDyYO4NGcoQNHqZUlan\np1m6kLz+qW0E5+AFaiwagtmotNjUBLSMo4Kii+32DFFnb1rGpwmj6lunXKCBNeWI\nwQPl/F/CNstMveViaYto87/lQ0khO6dX/wahoubj2Ipyzr02PXKOJUCID/X7wZWW\n2mjAY+5yrwHHEi/CGK0rpB0V1QKBgQDMq0mCF+CQbH/LKLB1J66i4s6rz5RBk6cI\njTl3rRUbkRfIdKPOjpogrlOHFqy/vZEV2eTLWHN1/jgZ1xv9hwkv3TBnB7GtKAMy\nWK3PQmV8ObJi3kQ/AYPBArlG0hxuj7Avu7Qs3zjQZ0VoQFyqKLjSY4uRgLee3Ovw\nhPuh0isnJQKBgBGtmC9EbkR4T2jXZJKd1iGRZPd+DAGLl/9NGyJj4NQ5PIdaQIDx\nfBm28wg7JcTRjmFm1YErGrw+OUazU6aBzXL80U8tB+70+sIOyKhC/wANxEu0OiRk\n6WroosaDiLWO9qX6HVzYwrgp0dsm5241R+agY0fiE9MdNHaHrjm8opJxAoGAD+e7\nxa1fWTnlUH9v/xq/Wo8vqnBuQA5ea6616ZP80PCcnYpa9IFmfuWtPhFICXqM3Nrb\nCeZsyp2f9HogBbrJvvt8eHVDnIZAgVgc4b9yLY46S66kNRVEDOrORS+s3/awpXT7\n0oTiYGe2IBzoVpzliAwOW5daLbFTcJSVDYVMrzUCgYEA3o1GhFwtOKVoGMa2UFhv\n+exWTufDcL7QsMAfrlRb2ohmt34IXNwpjrZDkhsWJfqqEA7r+NxmPKyKl0eXy3er\nHmMc+SEFp7Mtu8zUKmvp6Wj6Hmns9CvlxCJ00Ha7L/r1V7XTTYG7L9cOtUI1DOSL\nezuMyW20sfTW9d1ZxJaqlaQ=\n-----END PRIVATE KEY-----\n",
};

initializeApp({
  credential: cert(serviceAccount),
});
export const firebaseAuth = getAuth();

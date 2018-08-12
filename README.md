# react-native-to-s3
This is a demo app for Scalable File-Upload to AWS S3 from a React Native App.

### How does this work?
The working is pretty simple. When we press the upload button in RN App. It sends a GET request to our server. /upload route handles the uploads.
AWS.S3.getSignedUrl takes the pearameters and returns a URL that can be used to upload the image from the app itself. That means, we do not need
to upload the image to server first and then to S3 from server. We can directly upload to AWS S3 using the URL we received. It makes the file upload
really scalable.

### Is it secure?
Yes it is.

### How can I use this boilerplate in my project?
Coming soon! I will soon publish an NPM module for making this easy.

#### A post is coming with detailed explanation on (my Medium Publication)[https://blog.priyanshrastogi.com]
# Image Uploader Application

This application allows users to upload images and videos to Cloudinary. It provides functionality to upload files locally to the server, upload images and videos to Cloudinary, and reduce the file size of uploaded files.

## Features

- Upload files locally to the server
- Upload images to Cloudinary
- Upload videos to Cloudinary
- Reduce file size before uploading

## Routes

### 1. Upload File Locally

- **Endpoint**: `/localFileUpload`
- **Method**: `POST`
- **Description**: Upload a file locally to the server.
- **Request Body**:
  - `name`: User's name
  - `email`: User's email
  - `tag`: Tag for the file
  - `file`: File to be uploaded (in `request.files.file`)

### 2. Upload Image to Cloudinary

- **Endpoint**: `/imageUpload`
- **Method**: `POST`
- **Description**: Upload an image to Cloudinary.
- **Request Body**:
  - `name`: User's name
  - `email`: User's email
  - `tag`: Tag for the image
  - `quality`: Quality of the image (optional)
  - `file`: Image file to be uploaded (in `request.files.file`)

### 3. Upload Video to Cloudinary

- **Endpoint**: `/videoUpload`
- **Method**: `POST`
- **Description**: Upload a video to Cloudinary.
- **Request Body**:
  - `name`: User's name
  - `email`: User's email
  - `tag`: Tag for the video
  - `file`: Video file to be uploaded (in `request.files.video`)

### 4. Reduce File Size

- **Endpoint**: `/sizeReducer`
- **Method**: `POST`
- **Description**: Reduce the size of the file.
- **Request Body**:
  - `name`: User's name
  - `email`: User's email
  - `tag`: Tag for the file
  - `quality`: Desired quality for the file
  - `file`: File to be reduced (in `request.files.file` or `request.files.video`)

## Getting Cloudinary Credentials
- To obtain your Cloudinary credentials:
- Sign up or log in to Cloudinary.
- Go to your Cloudinary Dashboard.
- Under the "Account Details" section, you will find your Cloud Name, API Key, and API Secret.

## Replace the placeholder values with your actual credentials:

- DATABASE: Your MongoDB connection string
- CLOUD_NAME: Your Cloudinary cloud name
- API_SECRET: Your Cloudinary API secret
- CLOUD_API_KEY: Your Cloudinary API key

## .env File Configuration

Create a `.env` file in the root directory of your project and add the following environment variables:

```plaintext
PORT=4000
DATABASE="mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&appName=ImageUploader"
CLOUD_NAME='your_cloud_name'
API_SECRET='your_api_secret'
CLOUD_API_KEY='your_cloud_api_key'
```

## Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/imageUploaderApp.git
cd imageUploaderApp
```

2. Install dependencies:

```bash
npm install
```

4. Run the application:

```bash
npm start
```
5. The application will be running on http://localhost:4000.

# Author
- developed by [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/avinashsirohi86/?originalSubdomain=in)  Avinash Sirohi with love...❤️

    



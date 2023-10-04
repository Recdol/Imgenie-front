import axios from 'axios';

const myHost = `${window.location.protocol}//${window.location.host}`;
const backendUrl = `${myHost}${process.env.REACT_APP_BACKEND_HOST}`;
const urlToBlob = async (url) => {
  const res = await fetch(url);
  return res.blob();
};

export default async function requestRecommendMusic(imageUrl, genres) {
  const imageBlob = await urlToBlob(imageUrl);

  const formData = new FormData();
  formData.append('image', imageBlob);
  formData.append('genres', genres);

  return axios
    .post(`${backendUrl}/recommendMusic`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data)
    .then(({ inference_id: inferenceId, songs, image_url: savedImageUrl }) => ({
      inferenceId,
      songs,
      imageUrl: `${backendUrl}/${savedImageUrl}`,
    }));
}

import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_HOST;

export default async function requestUserFeedback(inferenceId, songId, isLike) {
  const data = {
    inference_id: inferenceId,
    song_id: songId,
    is_like: isLike,
  };

  return axios.post(`${backendUrl}/userFeedback`, JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

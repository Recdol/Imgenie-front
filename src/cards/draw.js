import backgroundMusicCardImg from './imgs/white_background_qr.png';

export const drawBackgroundMusicCard = async (canvas, ctx) =>
  new Promise((resolve) => {
    const backgroundImgTag = new Image();
    backgroundImgTag.src = backgroundMusicCardImg;

    backgroundImgTag.width = canvas.width;
    backgroundImgTag.height =
      backgroundImgTag.width + backgroundImgTag.width * 0.68;

    backgroundImgTag.onload = () => {
      // background
      ctx.drawImage(
        backgroundImgTag,
        0,
        0,
        backgroundImgTag.width,
        backgroundImgTag.height
      );

      resolve(backgroundImgTag);
    };
  });

export const drawQueryImage = (canvas, ctx, url, backgroundImgTag) =>
  new Promise((resolve) => {
    const queryImgTag = new Image();
    queryImgTag.src = url;

    queryImgTag.onload = () => {
      const cornerRadius = 15; // radi
      const x = backgroundImgTag.width - backgroundImgTag.width * 0.939;
      const y = backgroundImgTag.height - backgroundImgTag.height * 0.932;
      const queryWidth =
        backgroundImgTag.width - backgroundImgTag.width * 0.118;
      const queryHeight =
        backgroundImgTag.width - backgroundImgTag.width * 0.118;

      ctx.beginPath();
      ctx.moveTo(x + cornerRadius, y);
      ctx.lineTo(x + queryWidth - cornerRadius, y);
      ctx.arcTo(
        x + queryWidth,
        y,
        x + queryWidth,
        y + cornerRadius,
        cornerRadius
      );
      ctx.lineTo(x + queryWidth, y + queryHeight - cornerRadius);
      ctx.arcTo(
        x + queryWidth,
        y + queryHeight,
        x + queryWidth - cornerRadius,
        y + queryHeight,
        cornerRadius
      );
      ctx.lineTo(x + cornerRadius, y + queryHeight);
      ctx.arcTo(
        x,
        y + queryHeight,
        x,
        y + queryHeight - cornerRadius,
        cornerRadius
      );
      ctx.lineTo(x, y + cornerRadius);
      ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
      ctx.closePath();

      ctx.clip();

      ctx.drawImage(queryImgTag, x, y, queryWidth, queryHeight);

      resolve();
    };
  });

export const drawCard = async (canvasRef, imgRef, song, imgUrl) => {
  const canvas = canvasRef.current;
  // origin: 525
  canvas.width = 525;
  // origin: 884
  canvas.height = 884;

  let newmusicTitle = song.song_title;
  let newartistName = song.artist_name;
  const musicTitleThreshold = canvas.width - canvas.width * 0.25;
  const artistNameThreshold = canvas.width + canvas.width * 0.15;

  const ctx = canvas.getContext('2d');
  // font color
  ctx.fillStyle = 'black';

  const backgroundImgTag = await drawBackgroundMusicCard(canvas, ctx);
  // title
  ctx.font = `${
    backgroundImgTag.width - backgroundImgTag.width * 0.918
  }px Arial`;

  if (ctx.measureText(newmusicTitle).width > musicTitleThreshold) {
    let left = 0;
    let right = newmusicTitle.length;
    let mid;
    let nowWidth;

    while (left <= right) {
      mid = Math.ceil((left + right) / 2);
      nowWidth = ctx.measureText(
        newmusicTitle.substring(0, mid).concat('...')
      ).width;
      if (nowWidth <= musicTitleThreshold) {
        left = mid + 1;
      }
      if (nowWidth > musicTitleThreshold) {
        right = mid - 1;
      }
    }
    newmusicTitle = newmusicTitle.substring(0, left).concat('...');
  }

  ctx.fillText(
    newmusicTitle,
    backgroundImgTag.width - backgroundImgTag.width * 0.903,
    backgroundImgTag.height - backgroundImgTag.height * 0.293
  );

  if (ctx.measureText(newartistName).width > artistNameThreshold) {
    let left = 0;
    let right = newartistName.length;
    let mid;
    let nowWidth;

    while (left <= right) {
      mid = Math.ceil((left + right) / 2);
      nowWidth = ctx.measureText(
        newartistName.substring(0, mid).concat('...')
      ).width;
      if (nowWidth <= artistNameThreshold) {
        left = mid + 1;
      }
      if (nowWidth > artistNameThreshold) {
        right = mid - 1;
      }
    }
    newartistName = newartistName.substring(0, left).concat('...');
  }

  // artist
  ctx.font = `${
    backgroundImgTag.width - backgroundImgTag.width * 0.9543
  }px Arial`;
  ctx.fillText(
    `By. ${newartistName}`,
    backgroundImgTag.width - backgroundImgTag.width * 0.903,
    backgroundImgTag.height - backgroundImgTag.height * 0.25
  );

  await drawQueryImage(canvas, ctx, imgUrl, backgroundImgTag);
  const dataURL = canvas.toDataURL('image/png');
  const img = imgRef.current;
  img.src = dataURL;
};

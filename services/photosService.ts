const fetchPhotos = async () => {
  try {
    const response = await fetch(`/api/photos`);
    const data = await response.json();
    const { resources } = data;
    const result = resources
      .sort((a, b) => a?.created_at < b?.created_at)
      .map((el: any) => el.public_id);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export { fetchPhotos };

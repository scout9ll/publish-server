function composeUnprodUrl(config) {
  return (
    "//" +
    config.client.bucket +
    "." +
    config.client.region +
    "." +
    "aliyuncs.com" +
    config.path +
    "/index.html"
  );
}
